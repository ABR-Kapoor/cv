const LoadingState = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400 mr-4" />
    <span className="text-gray-400 text-sm sm:text-base">{message}</span>
  </div>
);

export default LoadingState;
