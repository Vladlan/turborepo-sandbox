import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center w-[100%] h-[100vh]">
      <h1 className="text-3xl font-bold pb-8">Oops!</h1>
      <p className="pb-8">Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) && (
        <p className="italic text-slate-600">
          <i>{error.statusText || error.message}</i>
        </p>
      )}
    </div>
  );
}
