export default function PortfolioPage() {
  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center">
        Nguyen Le - Fullstack Developer
      </h1>

      {/* About Me */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
          I'm a Fullstack Engineer with a passion for building efficient, scalable, and
          maintainable web applications. I enjoy working with modern technologies, cloud
          solutions like AWS, and writing clean, type-safe code. When I'm not coding,
          I love exploring tech trends, Vim tricks, and challenging myself with problem-solving.
        </p>
      </div>

      {/* Projects */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            <strong>Project A:</strong> A fullstack web app using Next.js, Tailwind, and AWS.
          </li>
          <li>
            <strong>Project B:</strong> Real-time collaborative tool built with WebSocket and React.
          </li>
          <li>
            <strong>Project C:</strong> Personal portfolio website (this one 😉) built with modern frontend tools.
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-700">
          Feel free to reach out via{' '}
          <a href="mailto:nguyenle@example.com" className="text-blue-500 underline">
            email
          </a>{' '}
          or connect with me on{' '}
          <a
            href="https://www.linkedin.com/in/nguyenle-se"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>.
        </p>
      </div>
    </section>
  )
}
