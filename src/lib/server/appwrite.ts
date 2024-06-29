
import { PaymentData } from "@/interfaces/PaymentData";
import { Client,Databases,Account,Storage,Avatars, Query } from "appwrite";
import { useRouter } from "next/navigation"; // Change this line

interface Answer {
  question: string;
  selectedOption: string;
  correctAnswer: string;
}
export const appWriteConfig = {
  url: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_MODULE_ID,
  modulesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_MODULE_ID,
  quizCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_QUIZ_ID,
  paymentsCollectionId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE_PAYMENTS_ID,
  quizResultsCollectionId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE_QUIZ_RESULTS_ID,
  userAnswersCollectionId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USER_ANSWER_ID
};
export const client = new Client();


client.setEndpoint(appWriteConfig.url as string) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId as string); // Your project ID


export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const account = new Account(client);
export { ID } from 'appwrite';
// Define database model

// Create connection to Appwrite database
const db = new Databases(client);

// Define collection for modules
const modulesCollection = db.listDocuments(appWriteConfig.databaseId,appWriteConfig.modulesCollectionId)



export { modulesCollection };
export function getQuiz(moduleId: number): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const quiz = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.quizCollectionId,
        [
          Query.equal('module_id',moduleId ),
      ]
      );

      console.log("QUIZ", quiz);

      if (!quiz || !quiz.documents) {
        reject(new Error('No quiz documents found'));
      } else {
        resolve(quiz);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      reject(error);
    }
  });
}

// Save payment details to Appwrite
export function savePayment(paymentData: PaymentData): Promise<void> {

  return new Promise((resolve, reject) => {

    let amount  = paymentData.amount ? paymentData.amount/100 : 0;
    databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.paymentsCollectionId,
      'unique()',
      {
        userId: paymentData.userId,
        courseId: paymentData.courseId,
        stripeSessionId: paymentData.stripeSessionId,
        amount: amount,
        status: paymentData.status,
      }
    )
      .then(() => {
        console.log('Payment saved successfully');
        resolve();
      })
      .catch((error: any) => {
        console.error('Error saving payment to Appwrite:', error);
        reject(new Error('Error saving payment to database'));
      });
  });
}

export async function checkUserEnrolled(userId: string, courseId: number): Promise<boolean> {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.paymentsCollectionId,
      [
        Query.equal('userId', userId),
        Query.equal('courseId', courseId),
      ]
    );

    return response.total > 0;
  } catch (error) {
    console.error('Error checking user enrollment:', error);
    throw error;
  }
}
export const fetchQuizResult = async (userId: string, moduleId: number) => {
  try {
    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.quizResultsCollectionId,
      [
        Query.equal('userId', userId),
        Query.equal('moduleId', moduleId),
      ]
    );

    if (response.documents.length > 0) {
      return response.documents[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching quiz result:', error);
  }
};

export const saveQuizResult = async (userId: string, moduleId: number, answers: Answer[]) => {
  try {

    const result = await fetchQuizResult(userId, moduleId);

    const correctCount = answers.filter(answer => answer.selectedOption === answer.correctAnswer).length;
    
    console.log("Correct Count", correctCount);


    let quizResultId;

    if (result) {
      quizResultId = result.$id;
      console.log(">>>>>>>>>>>>UPDATING");

    const updateResuly =   await databases.updateDocument(
        appWriteConfig.databaseId,
        appWriteConfig.quizResultsCollectionId,
        quizResultId,
        { correctCount,
          totalQuestions: answers.length }
      );

      console.log(updateResuly)
    } else {

      console.log(">>>>>>>>>>>>NOT UPDATING");

      const quizResultResponse = await databases.createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.quizResultsCollectionId,
        'unique()',
        { userId, moduleId,
          correctCount,
          totalQuestions: answers.length }
      );
      quizResultId = quizResultResponse.$id;
    }
    for (const answer of answers) {
      const existingAnswers = await databases.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.userAnswersCollectionId,
        [
          Query.equal('quizResultId', quizResultId),
          Query.equal('question', answer.question),
        ]
      );

      if (existingAnswers.total > 0) {
        // Update existing answer
        await databases.updateDocument(
          appWriteConfig.databaseId,
        appWriteConfig.userAnswersCollectionId,
          existingAnswers.documents[0].$id,
          {
            selectedOption: answer.selectedOption,
            correctAnswer: answer.correctAnswer,
          }
        );
      } else {
        // Create new answer
        await databases.createDocument(
          appWriteConfig.databaseId,
          appWriteConfig.userAnswersCollectionId,
          'unique()',
          {
            quizResultId,
            question: answer.question,
            selectedOption: answer.selectedOption,
            correctAnswer: answer.correctAnswer,
          }
        );
      }
    }
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};
export const fetchQuizAnswers = async (userId: string, moduleId: number) =>  {
  

  console.log("FETCHQUIZANSWES--------");
  const existingQuizResults = await fetchQuizResult(userId, moduleId);
  let fetchedAnswers ;

  if (existingQuizResults) {
    console.log("Existing users", existingQuizResults);
    // Fetch existing answers
    const quizResultId = existingQuizResults.$id;
    const existingAnswers = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userAnswersCollectionId,
      [Query.equal('quizResultId', quizResultId)]
    );

    if (existingAnswers.total > 0) {
      fetchedAnswers = existingAnswers.documents.map((document: any) => ({
        question: document.question,
        selectedOption: document.selectedOption,
        correctAnswer: document.correctAnswer,
      }));
    }

  }

  console.log("Fecthed  answers", fetchedAnswers);


  return fetchedAnswers;
}


export const checkUserPassed = async (userId:string) => {
  try {

    const response = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.quizResultsCollectionId,
      [
        Query.equal('userId', userId),
      ]
    );

    const completedModules = new Set();
    let passedAllModules = true;

    // Check pass/fail status for each module
    response.documents.forEach(module => {
      const { moduleId, totalQuestions, correctCount } = module;
      completedModules.add(moduleId);

      const percentageCorrect = (correctCount / totalQuestions) * 100;
      if (percentageCorrect < 50) {
        passedAllModules = false;
      }
    });

    // Check if all modules from 1 to 11 are completed
    for (let i = 1; i <= 11; i++) {
      if (!completedModules.has(i)) {
        passedAllModules = false;
        break;
      }
    }

  return { passedAllModules }

  } catch (error) {
    console.error('Error fetching quiz result:', error);
  }
}

