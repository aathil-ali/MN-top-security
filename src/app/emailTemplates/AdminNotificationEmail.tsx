import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";

type AdminNotificationEmailProps = {
  userName?: string;
  userEmail?: string;
  productTitle?: string;
  productImageUrl?: string;
  purchaseDate?: string;
  price?: string;
};

export default function AdminNotificationEmail({
  userName,
  userEmail,
  productTitle,
  productImageUrl,
  purchaseDate,
  price
}: AdminNotificationEmailProps) {
  const host = "neorepo.com";
  const escapedHost = host.replace(/\./g, "&#8203;.");
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <Html>
      <Head />
      <Preview>{`New Course Purchase - ${escapedHost}`}</Preview>
      <Section style={main}>
        <Container style={container}>
          <Section style={contentCenter}>
            <Text style={title}>New Course Purchase</Text>
            <Text style={subtitle}>{`User ${userName} (${userEmail}) has purchased a course.`}</Text>
          </Section>
          <Section style={itemBox}>
            <Img src={productImageUrl} alt="Course" width="140" height="auto" style={imageStyle} />
            <Section style={itemDetails}>
              <Text style={itemTitle}>{productTitle}</Text>
            </Section>
            <Section style={itemPrice}>
              <Text style={priceStyle}>  {formattedPrice}</Text>
              <Text style={paidOn}>{`Purchased on ${purchaseDate}`}</Text>
            </Section>
          </Section>
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

const contentCenter = {
  textAlign: "center" as const,
  marginBottom: "20px",
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