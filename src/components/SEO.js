import { Helmet } from 'react-helmet';

const SEO = () => {
  return (
    <Helmet>
      <title>DrivEdify - The Ultimate Driving Instructor Platform</title>
      <meta name="description" content="Transform your driving school with AI-powered insights, seamless scheduling, and student progress tracking." />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://drivedify.com/" />
      <meta property="og:title" content="DrivEdify - The Ultimate Driving Instructor Platform" />
      <meta property="og:description" content="Transform your driving school with AI-powered insights, seamless scheduling, and student progress tracking." />
      <meta property="og:image" content="https://drivedify.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://drivedify.com/" />
      <meta property="twitter:title" content="DrivEdify - The Ultimate Driving Instructor Platform" />
      <meta property="twitter:description" content="Transform your driving school with AI-powered insights, seamless scheduling, and student progress tracking." />
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