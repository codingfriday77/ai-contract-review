export default function ContractReview({ review, onReset }) {
  let parsedReview = null

  if (review?.parsedReview) {
    parsedReview = review.parsedReview
  } else if (review?.review && typeof review.review === 'string') {
    try {
      parsedReview = JSON.parse(review.review)
    } catch {
      parsedReview = null
    }
  } else if (typeof review === 'object') {
    parsedReview = review
  }

  const downloadText = parsedReview
    ? JSON.stringify(parsedReview, null, 2)
    : review.review || JSON.stringify(review, null, 2)

  const getRiskColor = (risk) => {
    const colors = {
      Low: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      Moderate: 'border-amber-200 bg-amber-50 text-amber-800',
      High: 'border-red-200 bg-red-50 text-red-800',
    }
    return colors[risk] || 'border-slate-200 bg-slate-50 text-slate-700'
  }

  const getRiskMark = (risk) => {
    const marks = { Low: 'L', Moderate: 'M', High: 'H' }
    return marks[risk] || '-'
  }

  return (
    <div className="max-h-[38rem] space-y-5 overflow-y-auto rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Analysis report</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Contract insights</h2>
        </div>
        <button
          onClick={onReset}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          New
        </button>
      </div>

      {parsedReview && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className={`rounded-lg border p-4 ${getRiskColor(parsedReview.overall_risk)}`}>
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/70 text-sm font-bold">
              {getRiskMark(parsedReview.overall_risk)}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Overall risk</p>
            <p className="mt-1 font-semibold">{parsedReview.overall_risk || 'Not rated'}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold">
              #
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Red flags</p>
            <p className="mt-1 font-semibold">{parsedReview.red_flags_count ?? 0}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-800">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold">
              T
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contract type</p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold">{parsedReview.contract_type || 'Unknown'}</p>
          </div>
        </div>
      )}

      {parsedReview?.risk_summary && (
        <section className="rounded-lg border border-slate-200 bg-[#fbfaf7] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Risk summary</p>
          <p className="mt-2 leading-7 text-slate-700">{parsedReview.risk_summary}</p>
        </section>
      )}

      {parsedReview?.overall_advice && (
        <section className="rounded-lg border border-teal-200 bg-teal-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Recommendations</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{parsedReview.overall_advice}</p>
        </section>
      )}

      {parsedReview?.missing_clauses?.length > 0 && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Missing clauses</p>
          <ul className="mt-3 space-y-2">
            {parsedReview.missing_clauses.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {parsedReview?.clauses?.length > 0 && (
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Clause analysis</p>
          <div className="space-y-3">
            {parsedReview.clauses.map((clause) => (
              <details key={clause.id} className="group rounded-lg border border-slate-200 bg-white">
                <summary className="flex cursor-pointer items-start justify-between gap-3 rounded-lg p-4 transition hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">{clause.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{clause.original_text}</p>
                  </div>
                  <span className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    clause.risk_level === 'red' ? 'bg-red-100 text-red-700' :
                    clause.risk_level === 'yellow' ? 'bg-amber-100 text-amber-700' :
                    clause.risk_level === 'green' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {clause.risk_level?.toUpperCase() || 'N/A'}
                  </span>
                </summary>
                <div className="space-y-4 border-t border-slate-200 bg-[#fbfaf7] p-4 text-sm leading-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What it means</p>
                    <p className="mt-1 text-slate-700">{clause.plain_english}</p>
                  </div>
                  {clause.why_risky && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Why it is risky</p>
                      <p className="mt-1 text-slate-700">{clause.why_risky}</p>
                    </div>
                  )}
                  {clause.indian_law_note && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Indian law note</p>
                      <p className="mt-1 text-slate-700">{clause.indian_law_note}</p>
                    </div>
                  )}
                  {clause.suggested_rewrite && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Better wording</p>
                      <p className="mt-1 text-slate-700">{clause.suggested_rewrite}</p>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {!parsedReview && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="whitespace-pre-wrap break-words font-mono text-xs leading-6 text-slate-700">
            {review.review || JSON.stringify(review, null, 2)}
          </p>
        </div>
      )}

      <div className="sticky bottom-0 flex gap-3 border-t border-slate-200 bg-white pt-4">
        <button
          onClick={onReset}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          New analysis
        </button>
        <button
          onClick={() => {
            const element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadText))
            element.setAttribute('download', 'contract_review.txt')
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
          }}
          className="flex-1 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Download
        </button>
      </div>
    </div>
  )
}
