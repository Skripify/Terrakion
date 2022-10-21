export default function NotFound() {
  return (
    <div className="flex flex-col h-screen text-center justify-center items-center">
      <h1 className="text-5xl font-bold">Oops...</h1>
      <p className="mt-3">
        The short URL you clicked on was deleted or never existed. <br /> Check
        that you entered or copy-pasted the short link correctly!
      </p>
      <p className="italic mt-5 text-neutral-500">
        P.S. Links are case sensitive.
      </p>
    </div>
  );
}
