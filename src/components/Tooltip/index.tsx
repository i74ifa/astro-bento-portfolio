import { type JSX, Show, createSignal } from "solid-js";

type Props = {
  children: JSX.Element;
};

function Tooltip(props: Props) {
  const [isVisible, setIsVisible] = createSignal(false);
  const [clickCount, setClickCount] = createSignal(0);

  const messages = [
    "",
    "مرحباً يا صديقي!",
    "ما زلت هنا؟ الظاهر أنك مصمم على الفضول!",
    "يا لك من مثابر! هل تبحث عن كنز مخفي؟",
    "ما الجديد؟ هل تتوقع أن يحدث شيء هذه المرة؟",
    "مرة أخرى؟ هل أنت جاد؟ أم أنك تمارس هواية الضغط؟",
    "أنت فضولي بشكل لا يصدق! هل أنت من محبي الألغاز؟",
    "ليس هذا لطيفًا! أشعر أنني أزرار تعاني.",
    "آه! هذا يؤلمني! ألا ترى أنني زر ضعيف؟",
    "ما سبب هذا الفضول؟ هل تظن أنني سأتحول إلى حورية؟",
    "أشعر بالملل! هل يمكن أن نلعب لعبة أخرى؟",
    "كفى! لقد طفح الكيل! أليس لدي أي حقوق؟",
    "ابحث لك عن هواية أخرى! ربما الرسم أو القراءة أفضل.",
    "توقف من فضلك! أنا أترجاك، هل تسمعني؟",
    "لقد سئمت الى اللقاء)",
    ""
  ];

  const currentMessage = () => {
    const count = clickCount();
    if (count >= messages.length) {
      return messages[messages.length - 1];
    }

    if (count + 1 === messages.length) {      
      document.querySelector('.easter-egg')?.classList.add('hidden');
      setTimeout(() => {
        document.querySelector('.easter-egg')?.classList.remove('hidden');
        document.querySelector('.easter-egg')?.setAttribute('disabled', 'true');
      }, 5000);
    }
    return messages[count];
  };

  return (
    <div class="relative inline-block">
      <div
        onMouseDown={() => {
          setIsVisible(!isVisible());
          if (isVisible()) {
            setClickCount((count) => count + 1);
          }
        }}
        onMouseUp={() => {
          setIsVisible(false);
        }}
        onTouchStart={() => {
          setIsVisible(!isVisible());
          if (isVisible()) {
            setClickCount((count) => count + 1);
          }
        }}
        onTouchEnd={() => {
          setIsVisible(false);
        }}
      >
        {props.children}
      </div>

      <Show when={isVisible()}>
        <div class="absolute left-1/2 -translate-x-1/2 -translate-y-24 mt-1 w-auto max-h-[70px] p-2 bg-black text-white text-center rounded-lg z-10 shadow-custom shadow-primary-500 border border-primary-500 whitespace-normal after:content-[''] after:block after:rotate-45 after:w-4 after:h-4 after:shadow-custom after:shadow-primary-500 after:absolute after:-bottom-2 after:-translate-x-1/2 after:left-1/2 after:bg-black after:z-20">
          <p class="w-max">{currentMessage()}</p>
        </div>
      </Show>
    </div>
  );
}

export default Tooltip;
