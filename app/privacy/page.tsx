export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us when you use our service, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Account information (name, email, profile picture)</li>
          <li>Authentication data through Google and GitHub</li>
          <li>Progress and learning data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and maintain our service</li>
          <li>Track your learning progress</li>
          <li>Improve our service</li>
          <li>Communicate with you about your account</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  )
} 