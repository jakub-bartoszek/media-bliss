"use client";

const Success = () => {
 return (
  <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-100 text-zinc-800 p-4">
   <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg text-center">
    <svg
     className="w-16 h-16 mx-auto text-primary"
     fill="none"
     stroke="currentColor"
     viewBox="0 0 24 24"
     xmlns="http://www.w3.org/2000/svg"
    >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2l4 -4m6 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z"
     ></path>
    </svg>
    <h1 className="text-3xl font-bold mt-4">Płatność zakończona sukcesem</h1>
    <p className="text-lg mt-2 text-zinc-600">
     Dziękujemy za zakup! Twoje zamówienie jest przetwarzane.
    </p>
    <button
     className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition"
     onClick={() => window.location.href = '/services/all'}
    >
     Kontynuuj zakupy
    </button>
   </div>
  </div>
 );
};

export default Success;
