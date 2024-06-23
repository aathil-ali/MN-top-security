import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";


type PaymentSuccessEmailProps = {
    price?: number;
    productTitle?: string;
    productImageUrl?: string;
    purchaseDate?: string;
  };
  

export default function PaymentSuccessEmail({ price, productTitle, productImageUrl, purchaseDate }: PaymentSuccessEmailProps) {
  const host = "neorepo.com";
  const escapedHost = host.replace(/\./g, "&#8203;.");
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <Html>
      <Head />
      <Preview>{`Payment Successful - ${escapedHost}`}</Preview>
      <Section style={main}>
        <Container style={container}>
          <Section style={logoSection}>
          </Section>
          <Section style={contentCenter}>
            <Img src={process.env.NEXT_PUBLIC_TICK_URL} alt="Check Icon" width="40" height="37" style={iconStyle} />
            <Text style={title}>Payment Successful</Text>
            <Text style={subtitle}>Thank you for your purchase!</Text>
          </Section>
          <Section style={itemBox}>
            <Img src={productImageUrl} alt="Course" width="140" height="auto" style={imageStyle} />
            <Section style={itemDetails}>
              <Text style={itemTitle}>{productTitle}</Text>
              <Text style={itemSubtitle}>by Mn Top Security Inc</Text>
              <Img src={process.env.NEXT_PUBLIC_APP_LOGO} alt="Company Logo" style={logoStyle} />

            </Section>
            <Section style={itemPrice}>
              <Text style={priceStyle}>  { formattedPrice }</Text>
              <Text style={paidOn}>Paid on {purchaseDate}</Text>
            </Section>
          </Section>
        
          <Button style={dashboardButton}>
            Go to Course Dashboard
          </Button>
        </Container>
      </Section>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  margin: "40px auto",
  padding: "40px",
  width: "465px",
  textAlign: "center" as const,
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const logoStyle = {
  width: "60px",
  height: "auto",
  marginBottom: "20px",
};

const contentCenter = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const iconStyle = {
  width: "40px",
  height: "40px",
  marginBottom: "20px",
  margin: "0 auto",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  marginBottom: "8px",
};

const subtitle = {
  color: "#6b7280",
  fontSize: "16px",
  marginBottom: "32px",
};

const itemBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  marginBottom: "20px",
};

const imageStyle = {
  borderRadius: "8px",
};

const itemDetails = {
  textAlign: "left" as const,
};

const itemTitle = {
  fontSize: "16px",
  fontWeight: "500" as const,
};

const itemSubtitle = {
  color: "#6b7280",
  fontSize: "14px",
};

const itemPrice = {
  textAlign: "right" as const,
};

const priceStyle = {
  fontSize: "16px",
  fontWeight: "500" as const,
};

const paidOn = {
  color: "#6b7280",
  fontSize: "14px",
};

const downloadButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  backgroundColor: "#f3f4f6",
  color: "#111827",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: "500" as const,
  marginBottom: "10px",
  textDecoration: "none",
};

const buttonIcon = {
  width: "16px",
  height: "16px",
  marginRight: "8px",
};

const dashboardButton = {
  borderRadius: "8px",
  backgroundColor: "#111827",
  color: "#ffffff",
  padding: "10px 20px",
  fontSize: "14px",
  fontWeight: "500" as const,
  textDecoration: "none",
};