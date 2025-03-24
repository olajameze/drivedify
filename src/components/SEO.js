import { Helmet } from 'react-helmet';

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://drivedify.com/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://drivedify.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://drivedify.com/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://drivedify.com/og-image.jpg" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "DrivEdify",
          "applicationCategory": "BusinessApplication",
          "description": "A comprehensive web application for driving instructors, featuring AI-powered insights, lesson scheduling, and student progress tracking.",
          "offers": {
            "@type": "Offer",
            "price": "10",
            "priceCurrency": "GBP"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
