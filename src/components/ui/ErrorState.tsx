const ErrorState = ({ message = 'Failed to load data' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center px-4">
    <div className="text-4xl mb-4">😔</div>
    <p className="text-red-400 text-base sm:text-lg font-semibold mb-2">Oops! Something went wrong</p>
    <p className="text-gray-500 text-sm mb-6 max-w-sm">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
