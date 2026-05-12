import { useState } from 'react'
import axios from 'axios'

export default function ContractUpload({ onReviewSubmit, onError, setLoading, isLoading, hasReview }) {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles[0]) {
      if (droppedFiles[0].type === 'application/pdf') {
        setFile(droppedFiles[0])
      } else {
        onError('Please drop a PDF file')
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === 'application/pdf') {
        setFile(e.target.files[0])
      } else {
        onError('Please select a PDF file')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      onError('Please select a file')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/review', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const responseData = response.data
      let parsedReview = null

      if (responseData.review && typeof responseData.review === 'string') {
        try {
          parsedReview = JSON.parse(responseData.review)
        } catch {
          parsedReview = null
        }
      }

      onReviewSubmit({
        ...responseData,
        parsedReview,
      })
      setFile(null)
    } catch (err) {
      onError(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          'Failed to process contract'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Review tool</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Upload contract</h2>
        </div>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
          PDF
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`block rounded-lg border-2 border-dashed p-7 text-center transition ${
            dragActive
              ? 'border-teal-500 bg-teal-50'
              : 'border-slate-300 bg-[#fbfaf7] hover:border-slate-400'
          } ${isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isLoading}
          />

          <span className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
            file ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-950 text-white'
          }`}>
            {file ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            )}
          </span>

          {file ? (
            <>
              <p className="break-words font-semibold text-slate-900">{file.name}</p>
              <p className="mt-1 text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB selected</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">Drop your PDF here</p>
              <p className="mt-2 text-sm text-slate-500">or click to browse files from your device</p>
            </>
          )}
        </label>

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${
            file && !isLoading
              ? 'bg-slate-950 text-white shadow-sm hover:bg-slate-800'
              : 'cursor-not-allowed bg-slate-100 text-slate-400'
          }`}
        >
          {isLoading ? 'Analyzing contract...' : hasReview ? 'Analyze another contract' : 'Analyze contract'}
        </button>
      </form>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        {['PDF supported', 'Secure upload', 'Fast report'].map((item) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="mb-2 block h-1.5 w-8 rounded-full bg-teal-500" />
            <p className="font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
