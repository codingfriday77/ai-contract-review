import { useState } from 'react'
import ContractUpload from './components/ContractUpload'
import ContractReview from './components/ContractReview'

function App() {
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleReviewSubmit = (reviewData) => {
    setReview(reviewData)
    setError(null)
  }

  const handleError = (errorMsg) => {
    setError(errorMsg)
    setReview(null)
  }

  const handleReset = () => {
    setReview(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f7f5f0]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="flex items-center gap-3"
            aria-label="AI Contract Review home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white shadow-sm">
              AI
            </span>
            <span className="text-lg font-semibold tracking-tight">Contract Review</span>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#review" className="transition hover:text-slate-950">Review</a>
            <a href="#workflow" className="transition hover:text-slate-950">Workflow</a>
            <a href="#security" className="transition hover:text-slate-950">Security</a>
          </nav>

          <a
            href="#review-tool"
            className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 md:inline-flex"
          >
            Start analysis
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-800 shadow-sm transition hover:border-slate-400 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-semibold text-slate-700">
              <a href="#review" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-100">Review</a>
              <a href="#workflow" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-100">Workflow</a>
              <a href="#security" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-100">Security</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="review" className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI-powered contract analysis for Indian law
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Review contracts faster with clear risk intelligence.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Upload a PDF contract and get a structured risk summary, missing clause checks, plain-English explanations, and suggested wording in a focused workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#review-tool"
                className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Review a contract
              </a>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400"
              >
                See workflow
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              <div>
                <p className="text-2xl font-semibold text-slate-950">PDF</p>
                <p className="mt-1 text-sm text-slate-500">Upload support</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-950">JSON</p>
                <p className="mt-1 text-sm text-slate-500">Structured report</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-950">India</p>
                <p className="mt-1 text-sm text-slate-500">Law context</p>
              </div>
            </div>
          </div>

          <div id="review-tool" className={`grid gap-6 ${review ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
            <ContractUpload
              onReviewSubmit={handleReviewSubmit}
              onError={handleError}
              setLoading={setLoading}
              isLoading={loading}
              hasReview={!!review}
            />

            {(loading || error || review) && (
              <div>
                {loading && (
                  <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70">
                    <div>
                      <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-b-slate-950"></div>
                      <p className="font-semibold text-slate-800">Analyzing contract...</p>
                      <p className="mt-2 text-sm text-slate-500">Reading clauses, obligations, and risk signals.</p>
                    </div>
                  </div>
                )}

                {error && !loading && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-xl shadow-red-100/60">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-700">!</span>
                      <div>
                        <h3 className="font-semibold text-red-900">Error processing contract</h3>
                        <p className="mt-2 text-sm leading-6 text-red-700">{error}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleReset}
                      className="mt-5 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {review && !loading && (
                  <ContractReview review={review} onReset={handleReset} />
                )}
              </div>
            )}
          </div>
        </section>

        <section id="workflow" className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              ['01', 'Upload', 'Drop in a PDF contract and keep the review workflow in one place.'],
              ['02', 'Analyze', 'AI extracts obligations, risks, missing clauses, and plain-English notes.'],
              ['03', 'Act', 'Download the structured report and use suggested wording for revisions.'],
            ].map(([step, title, copy]) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-[#fbfaf7] p-6">
                <p className="text-sm font-semibold text-teal-700">{step}</p>
                <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security" className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Professional review workspace</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Built for focused contract decisions.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Secure upload flow', 'Clause-level reasoning', 'Exportable reports'].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="mb-4 block h-1.5 w-10 rounded-full bg-amber-400" />
                  <p className="font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>(c) 2026 AI Contract Review. Legal analysis tool for Indian contracts.</p>
          <p>For review support only. Consult a qualified legal professional before acting.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
