export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-lg">
        <p className="mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this service, you accept and agree to be bound by the terms and conditions of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily access the materials (information or software) on our service for personal, non-commercial transitory viewing only.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Account</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account and password.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Service Modifications</h2>
        <p className="mb-4">
          We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us.
        </p>
      </div>
    </div>
  )
} 