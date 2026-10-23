type WhatsAppBubbleProps = {
  phoneNumber: string;
};

export default function WhatsAppBubble({ phoneNumber }: WhatsAppBubbleProps) {
  const normalizedNumber = phoneNumber.replace(/\D/g, "");
  if (!normalizedNumber) return null;

  const message = encodeURIComponent("Hi VBN+! I'd like to learn more about your services.");

  return (
    <a
      href={`https://wa.me/${normalizedNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VBN+ on WhatsApp"
      title="Chat with VBN+ on WhatsApp"
      className="fixed bottom-5 end-5 z-[70] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,.35)] transition duration-200 hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-7 sm:end-7 sm:size-16"
    >
      <svg viewBox="0 0 32 32" className="size-8 sm:size-9" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3a12.9 12.9 0 0 0-11.1 19.47L3 29l6.7-1.76A12.9 12.9 0 1 0 16.02 3Zm0 23.45c-2.02 0-4-.55-5.72-1.6l-.41-.24-3.98 1.04 1.06-3.88-.27-.42a10.5 10.5 0 1 1 9.32 5.1Zm5.76-7.85c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-.99 1.24-.18.22-.36.24-.68.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.22.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.36-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.27c.16.22 2.22 3.39 5.37 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
