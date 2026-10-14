/**
 * SOY CRESPA NATURALMENTE - DATOS OFICIALES Y CATÁLOGO COMERCIAL
 * Información verídica extraída de los canales y recursos oficiales del salón.
 * Ubicación: Pereira, Risaralda, Colombia.
 */

const SALON_DATA = {
  name: "Soy Crespa Naturalmente",
  slogan: "Tu cabello te hace resaltar",
  tagline: "Un espacio para descubrir, cuidar y celebrar la belleza natural de cada rizo.",
  address: "Cra. 9 #21-72, Centro, Pereira, Risaralda, Colombia",
  phone: "+57 312 717 9616",
  phoneDisplay: "(+57) 312 717 9616",
  whatsappNumber: "573127179616",
  instagram: "https://instagram.com/soycrespanaturalmente?obrf=a3J6ejB4c2dpOW9z",
  instagramHandle: "@soycrespanaturalmente",
  facebook: "https://www.facebook.com/share/1CWs3LoXkT/",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cra.+9+%2321-72%2C+Centro%2C+Pereira%2C+Risaralda%2C+Colombia",
  hours: [
    { day: "Lunes", time: "9:00 a. m. – 5:30 p. m.", open: true, start: "09:00", end: "17:30" },
    { day: "Martes", time: "9:00 a. m. – 5:30 p. m.", open: true, start: "09:00", end: "17:30" },
    { day: "Miércoles", time: "9:00 a. m. – 5:30 p. m. (Confirmar)", open: true, start: "09:00", end: "17:30", note: "Por favor confirmar horario del día por WhatsApp" },
    { day: "Jueves", time: "9:00 a. m. – 5:30 p. m.", open: true, start: "09:00", end: "17:30" },
    { day: "Viernes", time: "9:00 a. m. – 5:30 p. m.", open: true, start: "09:00", end: "17:30" },
    { day: "Sábado", time: "9:00 a. m. – 5:00 p. m.", open: true, start: "09:00", end: "17:00" },
    { day: "Domingo", time: "Cerrado", open: false }
  ]
};

// Función reutilizable oficial para generar enlaces de WhatsApp con mensajes codificados
function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${SALON_DATA.whatsappNumber}`;
  const encoded = encodeURIComponent(message.trim());
  return `${base}?text=${encoded}`;
}

// Catálogo de Servicios
const SERVICES_DATA = [
  {
    id: "definicion-sonada",
    title: "Definición Soñada",
    category: "definicion",
    categoryLabel: "Definición",
    badge: "Más Solicitado",
    image: "assets/images/crops/definicion-espirales-largos.jpg",
    shortDescription: "Técnica artesanal de activación de rizo por rizo para lograr máxima definición, brillo y movimiento duradero.",
    fullDescription: "La Definición Soñada es el servicio insignia de Soy Crespa Naturalmente. Nuestro equipo analiza el patrón de tu rizo para aplicar la técnica de definición más adecuada (fitagem, dedoliss, pulsing o scrunch) utilizando productos libres de sulfatos agresivos y siliconas pesadas. Logramos un acabado con volumen armonioso y máxima retención del rizo sin efecto rígido.",
    priceType: "tiers",
    priceNote: "Tarifa según densidad capilar",
    prices: [
      { tier: "Densidad baja", price: 55000, formatted: "$55.000 COP" },
      { tier: "Densidad media", price: 75000, formatted: "$75.000 COP" },
      { tier: "Densidad alta", price: 90000, formatted: "$90.000 COP" },
      { tier: "Densidad extra alta", price: 110000, formatted: "$110.000 COP" }
    ],
    includes: [
      "Lavado con shampoo suave libre de sulfatos",
      "Acondicionamiento y desenredo respetuoso",
      "Técnica de definición personalizada según tu patrón",
      "Secado profesional con difusor a temperatura controlada"
    ],
    idealFor: "Cabellos ondulados, rizados o afro que buscan rizos definidos, control del frizz y movimiento natural.",
    duration: "Aprox. 1h 30m - 2h (dependiendo de la densidad)",
    whatsappMessage: "Hola, quisiera agendar una cita para Definición Soñada. Me gustaría confirmar el precio según la densidad de mi cabello y conocer los horarios disponibles."
  },
  {
    id: "cortes-mujeres",
    title: "Cortes para Mujeres",
    category: "cortes",
    categoryLabel: "Cortes",
    badge: "Especialidad en Seco",
    image: "assets/images/crops/corte-iluminacion-crespos.jpg",
    shortDescription: "Corte estructurado especialmente diseñado para cabello crespo respetando el encogimiento y la caída natural.",
    fullDescription: "Cortar cabello rizado u ondulado requiere una técnica muy diferente a la del cabello lacio. Diseñamos la forma tomando en cuenta el factor de encogimiento natural de cada mechón, aportando volumen equilibrado donde lo necesitas y eliminando peso indeseado sin sacrificar tu longitud si no lo deseas.",
    priceType: "options",
    priceNote: "Tarifas confirmadas por tipo de corte",
    prices: [
      { tier: "Puntas y forma", price: 30000, formatted: "$30.000 COP" },
      { tier: "Capas estructuradas", price: 50000, formatted: "$50.000 COP" },
      { tier: "Diseño personalizado", price: 65000, formatted: "$65.000 COP" }
    ],
    includes: [
      "Evaluación previa de simetría y encogimiento",
      "Corte especializado en textura rizada / crespa",
      "Alineación de puntas y armonización de volumen",
      "Asesoría para el mantenimiento del corte"
    ],
    idealFor: "Cualquier textura rizada que necesite revitalizar su silueta, eliminar puntas abiertas o crear capas con movimiento.",
    duration: "Aprox. 45m - 1h 15m",
    whatsappMessage: "Hola, Soy Crespa Naturalmente. Me interesa un corte para mujer. ¿Podrían indicarme las opciones, el precio actual y la disponibilidad?"
  },
  {
    id: "nutricion-hidratacion",
    title: "Nutrición e Hidratación Capilar",
    category: "tratamientos",
    categoryLabel: "Tratamientos",
    badge: "Revitalizante",
    image: "assets/images/crops/definicion-rojos-antes-despues.jpg",
    shortDescription: "Recupera la elasticidad, suavidad y sedosidad con fórmulas concentradas en lípidos y humectantes botánicos.",
    fullDescription: "La curvatura natural del cabello crespo dificulta que los aceites naturales del cuero cabelludo lleguen a las puntas. Nuestro tratamiento de nutrición e hidratación devuelve los lípidos esenciales, aportando elasticidad, combatiendo la porosidad y sellando la cutícula para prevenir el quiebre.",
    priceType: "tiers",
    priceNote: "Tarifa según densidad capilar",
    prices: [
      { tier: "Densidad baja", price: 30000, formatted: "$30.000 COP" },
      { tier: "Densidad media", price: 40000, formatted: "$40.000 COP" },
      { tier: "Densidad alta", price: 50000, formatted: "$50.000 COP" }
    ],
    includes: [
      "Shampoo equilibrante e higienización suave",
      "Aplicación de tratamiento nutritivo profundo",
      "Masaje capilar estimulante y enjuague meticuloso",
      "Aplicación de Leave-in acondicionador sellador"
    ],
    idealFor: "Cabellos secos, quebradizos, opacos o que atraviesan procesos de transición capilar.",
    duration: "Aprox. 1h",
    whatsappMessage: "Hola, quisiera información sobre Nutrición e Hidratación Capilar. ¿Me pueden orientar sobre el servicio, su precio actual y la disponibilidad?"
  },
  {
    id: "ozonoterapia-capilar",
    title: "Ozonoterapia Capilar",
    category: "tratamientos",
    categoryLabel: "Ozonoterapia",
    badge: "Tecnología Capilar",
    image: "assets/images/crops/definicion-castano-volumen.jpg",
    shortDescription: "Vapor de ozono que oxigena el cuero cabelludo, potencia la absorción de nutrientes y purifica la hebra capilar.",
    fullDescription: "La ozonoterapia capilar aprovecha las propiedades purificantes del ozono y el calor húmedo controlado para abrir suavemente la cutícula y facilitar una absorción profunda de las mascarillas regeneradoras. Estimula la circulación en el folículo piloso, ayuda a desinflamar el cuero cabelludo y deja la fibra visiblemente más suave y elástica.",
    priceType: "tiers",
    priceNote: "Tarifa según densidad capilar",
    prices: [
      { tier: "Densidad baja", price: 50000, formatted: "$50.000 COP" },
      { tier: "Densidad media", price: 60000, formatted: "$60.000 COP" },
      { tier: "Densidad alta", price: 70000, formatted: "$70.000 COP" }
    ],
    includes: [
      "Shampoo preparador purificante",
      "Sesión de vaporización con ozono capilar activo",
      "Tratamiento intensivo de regeneración capilar",
      "Lavado con agua fresca para sellar cutícula",
      "Aplicación de Leave-in protector"
    ],
    idealFor: "Cueros cabelludos congestionados, hebras con porosidad desequilibrada o rizos que necesitan un respiro revitalizante.",
    duration: "Aprox. 1h 15m",
    whatsappMessage: "Hola, me interesa conocer el servicio de Ozonoterapia Capilar. ¿Podrían facilitarme información sobre el procedimiento, su tarifa y los horarios disponibles?"
  },
  {
    id: "definicion-express",
    title: "Definición Express",
    category: "definicion",
    categoryLabel: "Definición",
    badge: "Rápido & Efectivo",
    image: "assets/images/crops/afro-transformacion-crespos.jpg",
    shortDescription: "Una sesión ágil para estilizar y refrescar tus rizos cuando tienes un evento o poco tiempo disponible.",
    fullDescription: "Pensada para quienes necesitan lucir unos rizos impecables en menor tiempo. Combinamos un lavado fresco, activación rápida de la onda o rizo con técnicas de manos libres y secado express con difusor.",
    priceType: "consult",
    priceNote: "Consultar tarifa actual por WhatsApp",
    prices: [
      { tier: "Sesión express", price: null, formatted: "Consultar precio" }
    ],
    includes: [
      "Lavado express con acondicionador hidratante",
      "Técnica de activación y definición rápida",
      "Secado express con difusor profesional"
    ],
    idealFor: "Personas con poco tiempo que requieren verse radiantes para un compromiso, reunión o salida especial.",
    duration: "Aprox. 45m",
    whatsappMessage: "Hola, quisiera consultar sobre la Definición Express. ¿Me podrían indicar la tarifa actual y los horarios disponibles?"
  },
  {
    id: "cortes-ninos",
    title: "Cortes para Niños y Niñas",
    category: "cortes",
    categoryLabel: "Cortes",
    badge: "Trato Amoroso",
    image: "assets/images/crops/definicion-extralarga-textura.jpg",
    shortDescription: "Cuidado delicado y paciente para los más pequeños, enseñándoles a amar su cabello desde temprana edad.",
    fullDescription: "En Soy Crespa Naturalmente cuidamos a los pequeños con paciencia, empatía y técnicas cero dolorosas. Eliminamos las puntas dañadas, armonizamos la forma y les explicamos de manera divertida por qué sus rizos son únicos y especiales.",
    priceType: "starting",
    priceNote: "Desde $30.000 COP según longitud",
    prices: [
      { tier: "Corte infantil", price: 30000, formatted: "Desde $30.000 COP" }
    ],
    includes: [
      "Desenredo suave con acondicionador especial",
      "Corte respetuoso del patrón natural infantil",
      "Estilizado suave con crema ligera",
      "Consejos prácticos para papás y mamás"
    ],
    idealFor: "Niñas y niños con cabello ondulado, rizado o afro para una experiencia positiva y sin lágrimas.",
    duration: "Aprox. 45m",
    whatsappMessage: "Hola, quisiera solicitar información para un corte para niños/niñas en Soy Crespa Naturalmente. ¿Qué disponibilidad tienen?"
  },
  {
    id: "cortes-hombres",
    title: "Cortes para Hombres",
    category: "cortes",
    categoryLabel: "Cortes",
    badge: "Estilo Masculino",
    image: "assets/images/web/gallery-4.webp",
    shortDescription: "Cortes y definición adaptados a la textura masculina, degradados limpios y volumen controlado.",
    fullDescription: "Los hombres con cabello ondulado, crespo o afro encuentran en nuestro salón un espacio dedicado a realzar su textura con elegancia y carácter. Cortes fade, taper, corte en capas superiores o mantenimiento de longitud con definición natural.",
    priceType: "consult",
    priceNote: "Consultar precio según técnica",
    prices: [
      { tier: "Corte masculino", price: null, formatted: "Consultar precio" }
    ],
    includes: [
      "Diagnóstico de patrón capilar y morfología",
      "Corte personalizado y pulido de contornos",
      "Lavado y asesoría rápida de peinado diario"
    ],
    idealFor: "Hombres que quieren sacar el máximo partido a sus rizos sin depender de fijadores duros ni ceras que resecan.",
    duration: "Aprox. 45m",
    whatsappMessage: "Hola, Soy Crespa Naturalmente. Me interesa consultar las opciones y tarifas para corte de hombre en cabello crespo."
  },
  {
    id: "productos-capilares",
    title: "Productos Especializados para Rizos",
    category: "productos",
    categoryLabel: "Productos",
    badge: "Asesoría Incluida",
    image: "assets/images/web/equipo-oficial.jpg",
    shortDescription: "Líneas seleccionadas libres de sulfatos agresivos, parabenos y siliconas pesadas para el cuidado en casa.",
    fullDescription: "Ofrecemos una selección cuidada de productos para el cuidado capilar en casa: shampoos hidratantes, mascarillas de nutrición profunda, activadores de rizos, gelatinas fijadoras sin alcohol, aceites ligeros y accesorios de satén para dormir. Te orientamos sobre qué producto necesita exactamente tu tipo de hebra.",
    priceType: "consult",
    priceNote: "Catálogo informativo con asesoría directa",
    prices: [
      { tier: "Asesoría de producto", price: null, formatted: "Consultar catálogo" }
    ],
    includes: [
      "Diagnóstico orientativo de necesidades en salón",
      "Recomendación personalizada de rutina capilar",
      "Productos aprobados para el cuidado del rizo"
    ],
    idealFor: "Quienes desean mantener la hidratación, definición y salud de su cabello en su rutina diaria.",
    duration: "Disponible en salón",
    whatsappMessage: "Hola, quisiera conocer los productos capilares disponibles y recibir orientación para elegir una opción adecuada para mi cabello."
  }
];

// Paquetes Oficiales Combinados
const PACKAGES_DATA = [
  {
    id: "paquete-enamores",
    title: "¡Pa' que te enamores de tus crespos!",
    subtitle: "Súper Paquete Transformador",
    badge: "Experiencia Estrella",
    recommended: true,
    image: "assets/images/crops/equipo-estilistas-hero.jpg",
    description: "Nuestra experiencia completa más transformadora: diagnóstico, corte, tratamiento profundo, definición experta y una clase personalizada para que aprendas a cuidar tus rizos tú misma en casa.",
    priceType: "tiers",
    priceNote: "Tarifa confirmada según densidad capilar",
    prices: [
      { tier: "Densidad baja", price: 140000, formatted: "$140.000 COP" },
      { tier: "Densidad media", price: 165000, formatted: "$165.000 COP" },
      { tier: "Densidad alta", price: 190000, formatted: "$190.000 COP" },
      { tier: "Densidad extra alta", price: 215000, formatted: "$215.000 COP" }
    ],
    features: [
      { name: "Diagnóstico Capilar Completo", included: true, detail: "Evaluamos porosidad, elasticidad y patrón de rizo" },
      { name: "Asesoría Personalizada", included: true, detail: "Resolvemos todas tus dudas sobre cuidado capilar" },
      { name: "Corte de Puntas y Forma", included: true, detail: "Armonización de volumen y eliminación de puntas dañadas" },
      { name: "Tratamiento Profundo", included: true, detail: "Mascarilla intensiva reparadora de nutrición" },
      { name: "Lavado Especializado", included: true, detail: "Con técnicas suaves que no enredan ni rompen el cabello" },
      { name: "Definición Personalizada", included: true, detail: "Rizo por rizo con técnica adaptada a tu patrón" },
      { name: "Secado Profesional con Difusor", included: true, detail: "Control de frizz y volumen duradero" },
      { name: "Clase Personalizada de Cuidado", included: true, detail: "Te enseñamos técnicas prácticas para replicar el resultado en casa" }
    ],
    whatsappMessage: "Hola, quisiera información para agendar el paquete ‘¡Pa' que te enamores de tus crespos!’. ¿Podrían confirmarme qué incluye, su precio actual y la disponibilidad?"
  },
  {
    id: "paquete-express",
    title: "Paquete Express",
    subtitle: "Renovación Rápida & Efectiva",
    badge: "Mantenimiento Ágil",
    recommended: false,
    image: "assets/images/crops/definicion-castano-volumen.jpg",
    description: "Diseñado para quienes necesitan un toque de belleza rápido pero impactante: mantenimiento de puntas, hidratación rápida y una definición fresca.",
    priceType: "consult",
    priceNote: "Consultar tarifa actual por WhatsApp",
    prices: [
      { tier: "Tarifa orientativa", price: null, formatted: "Consultar tarifa por WhatsApp" }
    ],
    features: [
      { name: "Diagnóstico Capilar Completo", included: false, detail: "Evaluación rápida previa" },
      { name: "Asesoría Personalizada", included: false, detail: "Indicaciones básicas" },
      { name: "Corte de Puntas", included: true, detail: "Mantenimiento ligero de puntas sanas" },
      { name: "Tratamiento Express", included: true, detail: "Hidratación rápida en lavacabezas" },
      { name: "Lavado Especializado", included: true, detail: "Con shampoo suave" },
      { name: "Definición Suave", included: true, detail: "Activación ligera y natural" },
      { name: "Secado Express", included: true, detail: "Con difusor rápido" },
      { name: "Clase Personalizada de Cuidado", included: false, detail: "No incluida en versión express" }
    ],
    whatsappMessage: "Hola, quisiera consultar la tarifa actual y la disponibilidad para agendar el Paquete Express en Soy Crespa Naturalmente."
  }
];

// Galería Oficial con las fotos auténticas recortadas y web
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Definición Soñada en Espirales Castaños",
    category: "definicion",
    categoryLabel: "Definición",
    image: "assets/images/crops/definicion-espirales-largos.jpg",
    description: "Definición rizo por rizo logrando máxima separación, elasticidad y brillo sin rigidez.",
    badge: "Resultado Real"
  },
  {
    id: 2,
    title: "Transformación & Control de Frizz en Rojo Cobrizo",
    category: "transformacion",
    categoryLabel: "Antes & Después",
    image: "assets/images/crops/definicion-rojos-antes-despues.jpg",
    description: "De hebras porosas y con frizz a rizos elásticos, hidratados y profundamente definidos.",
    badge: "Antes & Después"
  },
  {
    id: 3,
    title: "Transición Afro & Definición Coils",
    category: "afro",
    categoryLabel: "Textura Afro / Coils",
    image: "assets/images/crops/afro-transformacion-crespos.jpg",
    description: "Activación profunda de textura afro 4A-4C con hidratación y definición sin pérdida de forma.",
    badge: "Antes & Después"
  },
  {
    id: 4,
    title: "Corte Estructurado e Iluminación en Rizos",
    category: "cortes",
    categoryLabel: "Cortes & Color",
    image: "assets/images/crops/corte-iluminacion-crespos.jpg",
    description: "Corte en capas para distribuir volumen armónicamente resaltando mechas e iluminación.",
    badge: "Corte & Estilo"
  },
  {
    id: 5,
    title: "Volumen Natural & Rebote Saludable",
    category: "definicion",
    categoryLabel: "Definición",
    image: "assets/images/crops/definicion-castano-volumen.jpg",
    description: "Secado profesional con difusor manteniendo la forma natural y la raíz con cuerpo.",
    badge: "Resultado Real"
  },
  {
    id: 6,
    title: "Definición Extra Larga en Coils",
    category: "afro",
    categoryLabel: "Textura Afro / Coils",
    image: "assets/images/crops/definicion-extralarga-textura.jpg",
    description: "Cuidado de longitud y nutrición profunda para hebras densas y espirales cerrados.",
    badge: "Resultado Real"
  },
  {
    id: 7,
    title: "Armonización de Silueta en Rizos 3B",
    category: "cortes",
    categoryLabel: "Cortes & Color",
    image: "assets/images/web/gallery-1.webp",
    description: "Corte especializado respetando el patrón de encogimiento para una caída perfecta.",
    badge: "Trabajo en Salón"
  },
  {
    id: 8,
    title: "Rizos Elásticos & Brillo Espejo",
    category: "definicion",
    categoryLabel: "Definición",
    image: "assets/images/web/gallery-2.webp",
    description: "Tratamiento de ozonoterapia previo a la definición para revitalizar la cutícula.",
    badge: "Trabajo en Salón"
  },
  {
    id: 9,
    title: "Volumen con Definición en Cabello Medio",
    category: "definicion",
    categoryLabel: "Definición",
    image: "assets/images/web/gallery-3.webp",
    description: "Equilibrio entre soltura y definición sin apelmazar el cabello.",
    badge: "Trabajo en Salón"
  }
];

// Asesor Capilar Orientativo (Lógica Interactiva Local)
const QUIZ_QUESTIONS = [
  {
    step: 1,
    id: "goal",
    title: "¿Qué es lo que más deseas conseguir para tu cabello?",
    subtitle: "Selecciona el objetivo principal de tu visita",
    options: [
      { value: "definicion", label: "Definir mejor mis rizos y controlar el frizz", icon: "✨" },
      { value: "hidratacion", label: "Hidratar y recuperar suavidad profunda", icon: "💧" },
      { value: "corte", label: "Cambiar o renovar la forma del corte", icon: "✂️" },
      { value: "ozono", label: "Revitalizar el cuero cabelludo y oxigenar la hebra", icon: "🌿" },
      { value: "completo", label: "Una transformación integral y aprender a cuidarme", icon: "🌟" },
      { value: "orientacion", label: "Necesito orientación profesional previa", icon: "💬" }
    ]
  },
  {
    step: 2,
    id: "texture",
    title: "¿Qué tipo de textura describe mejor tu cabello natural?",
    subtitle: "Cada textura responde a técnicas y cuidados únicos",
    options: [
      { value: "ondulado", label: "Ondulado (ondas sueltas o marcadas, tipo 2A - 2C)", icon: "〰️" },
      { value: "crespo", label: "Crespo o Rizado (espirales y bucles definidos, tipo 3A - 3C)", icon: "🌀" },
      { value: "afro", label: "Afro o Coily (bucles muy apretados o en zig-zag, tipo 4A - 4C)", icon: "👑" },
      { value: "no-se", label: "No estoy completamente seguro/a", icon: "❓" }
    ]
  },
  {
    step: 3,
    id: "serviceType",
    title: "¿Hay algún servicio específico que ya te llame la atención?",
    subtitle: "Puedes elegir tu interés o dejar que te recomendemos",
    options: [
      { value: "definicion-sonada", label: "Definición Soñada", icon: "💫" },
      { value: "nutricion", label: "Nutrición o Hidratación Capilar", icon: "🧴" },
      { value: "corte", label: "Corte especializado en rizos", icon: "✂️" },
      { value: "ozonoterapia", label: "Ozonoterapia capilar", icon: "🌱" },
      { value: "paquete-enamores", label: "Paquete completo '¡Pa' que te enamores de tus crespos!'", icon: "💖" },
      { value: "orientame", label: "Quiero la mejor recomendación para mi caso", icon: "🎯" }
    ]
  },
  {
    step: 4,
    id: "density",
    title: "¿Cómo describirías la cantidad o densidad de tu cabello?",
    subtitle: "Esto nos ayuda a orientarte sobre las tarifas confirmadas",
    options: [
      { value: "baja", label: "Baja (cabello fino o poco volumen)", icon: "🔹" },
      { value: "media", label: "Media (volumen intermedio y estándar)", icon: "🔷" },
      { value: "alta", label: "Alta o Extra Alta (mucha cantidad, muy abundante)", icon: "🔶" },
      { value: "no-se", label: "No lo sé con certeza (evaluar en salón)", icon: "🔘" }
    ]
  }
];

// Motor de reglas del Asesor Capilar
function evaluateQuizAnswers(answers) {
  const goal = answers.goal || "definicion";
  const texture = answers.texture || "crespo";
  const density = answers.density || "media";
  const serviceType = answers.serviceType || "orientame";

  let recServiceId = "definicion-sonada";
  let reason = "Ideal para conseguir rizos definidos, libres de frizz y con movimiento natural.";

  if (goal === "completo" || serviceType === "paquete-enamores") {
    recServiceId = "paquete-enamores";
    reason = "Es la experiencia más integral: incluye diagnóstico, corte, tratamiento, definición y la clase personalizada para dominar tus rizos en casa.";
  } else if (goal === "corte" || serviceType === "corte") {
    recServiceId = "cortes-mujeres";
    reason = "Un corte especializado en seco armonizará tu silueta respetando el encogimiento y la caída natural de tus rizos.";
  } else if (goal === "ozono" || serviceType === "ozonoterapia") {
    recServiceId = "ozonoterapia-capilar";
    reason = "El vapor de ozono oxigenará tu cuero cabelludo y potenciará la penetración de los nutrientes para un cabello revitalizado.";
  } else if (goal === "hidratacion" || serviceType === "nutricion") {
    recServiceId = "nutricion-hidratacion";
    reason = "Aportará los lípidos y la humedad esencial que la curvatura de tus rizos necesita para recuperar suavidad y elasticidad.";
  } else if (goal === "definicion") {
    recServiceId = "definicion-sonada";
    reason = "Nuestra técnica estrella activa cada patrón respetando tu textura para un resultado brillante y duradero.";
  }

  // Buscar objeto de servicio o paquete
  let service = SERVICES_DATA.find(s => s.id === recServiceId);
  let isPackage = false;
  if (!service) {
    service = PACKAGES_DATA.find(p => p.id === recServiceId);
    isPackage = true;
  }

  // Calcular precio orientativo según densidad
  let estimatedPrice = "Consultar tarifa actual";
  if (service && service.prices && service.prices.length > 0) {
    if (density === "baja") {
      const p = service.prices.find(pr => pr.tier.toLowerCase().includes("baja"));
      if (p) estimatedPrice = p.formatted;
    } else if (density === "media") {
      const p = service.prices.find(pr => pr.tier.toLowerCase().includes("media"));
      if (p) estimatedPrice = p.formatted;
    } else if (density === "alta") {
      const p = service.prices.find(pr => pr.tier.toLowerCase().includes("alta") || pr.tier.toLowerCase().includes("extra"));
      if (p) estimatedPrice = p.formatted;
    } else {
      estimatedPrice = service.prices[0].formatted + " (según densidad)";
    }
  }

  const textureDisplay = {
    ondulado: "Ondulado (2A - 2C)",
    crespo: "Crespo / Rizado (3A - 3C)",
    afro: "Afro / Coily (4A - 4C)",
    "no-se": "Textura natural"
  }[texture] || "Textura natural";

  const densityDisplay = {
    baja: "Densidad baja",
    media: "Densidad media",
    alta: "Densidad alta / extra alta",
    "no-se": "Densidad a confirmar en salón"
  }[density] || "Densidad a confirmar";

  const customWhatsAppMsg = `Hola, utilicé el asesor capilar de la web. Mi cabello es ${textureDisplay} con ${densityDisplay}. El servicio recomendado fue "${service.title}". ¿Podrían indicarme la tarifa actual y la disponibilidad para agendar?`;

  return {
    service,
    isPackage,
    reason,
    textureDisplay,
    densityDisplay,
    estimatedPrice,
    customWhatsAppMsg
  };
}

// Reseñas Reales Verificadas de Google (Extraídas del plugin oficial Trustindex del sitio)
const REVIEWS_DATA = [
  {
    name: "Luz Castrillon",
    date: "28 de junio de 2023",
    stars: 5,
    source: "Reseña verificada en Google",
    comment: "Excelente atención y los productos para el cabello excelentes. Lo mejor para las mujeres que decidimos llevar el cabello crespo✨💯🇨🇴"
  },
  {
    name: "Carola Bonilla",
    date: "19 de julio de 2023",
    stars: 5,
    source: "Reseña verificada en Google",
    comment: "Buena asesoría para el cabello. Se nota el amor y el conocimiento real sobre el cuidado de rizos."
  },
  {
    name: "Angela Ocampo",
    date: "10 de diciembre de 2022",
    stars: 5,
    source: "Reseña verificada en Google",
    comment: "Me encantaaa. El trato es maravilloso y el cambio en mis rizos después de la definición es increíble."
  },
  {
    name: "Paula Andrea Rivera Calderon",
    date: "17 de septiembre de 2022",
    stars: 5,
    source: "Reseña verificada en Google",
    comment: "Excelente servicio, un lugar acogedor donde realmente entienden cómo tratar nuestro cabello crespo sin dañarlo."
  },
  {
    name: "Julián Gómez",
    date: "9 de mayo de 2022",
    stars: 5,
    source: "Reseña verificada en Google",
    comment: "Excelente atención y corte. Muy profesionales con el manejo de textura y forma."
  }
];

// Consejos Capilares y Artículos Editoriales Reales
const ARTICLES_DATA = [
  {
    id: "como-combatir-el-frizz",
    title: "Cómo combatir el frizz en cabello crespo: Trucos y técnicas efectivas",
    category: "Cuidado Diario",
    readTime: "4 min de lectura",
    image: "assets/images/web/tip-frizz.jpg",
    excerpt: "El frizz no es un enemigo, es una señal de que tu cabello busca humedad. Aprende cómo hidratarlo y sellar la cutícula adecuadamente.",
    body: `
      <h3>Entendiendo la verdadera causa del frizz</h3>
      <p>Muchas veces vemos el frizz como algo negativo, cuando en realidad suele ser simplemente cabello sediento buscando la humedad del ambiente. Dado que la hebra crespa tiene una estructura en espiral, las cutículas tienden a mantenerse más abiertas y los lípidos naturales del cuero cabelludo no descienden con facilidad.</p>
      
      <h4>1. Hidrata sobre cabello bien empapado</h4>
      <p>El agua es la primera fuente de hidratación. Aplica tus cremas de peinar y leave-in cuando el cabello aún esté bastante húmedo, distribuyendo mechón a mechón para asegurar que cada rizo quede envuelto por el producto.</p>
      
      <h4>2. Usa toallas de microfibra o camisetas de algodón</h4>
      <p>Las toallas convencionales de felpa generan fricción mecánica y absorben demasiada agua de golpe, levantando la cutícula. Cambiar a microfibra o una camiseta suave reduce drásticamente el frizz desde el primer día.</p>
      
      <h4>3. Sella con un aceite ligero vegetal</h4>
      <p>Una vez que el cabello esté completamente seco con difusor o al aire libre, rompe la capa dura del gel (efecto 'cast') con unas gotitas de aceite ligero como jojoba o argán, haciendo movimientos suaves de 'scrunch' de abajo hacia arriba.</p>
    `
  },
  {
    id: "autenticidad-y-empoderamiento",
    title: "Autenticidad y Empoderamiento: Inspiración y Reflexiones para las Mujeres Crespas",
    category: "Filosofía & Esencia",
    readTime: "5 min de lectura",
    image: "assets/images/web/tip-empoderamiento.jpg",
    excerpt: "Dejar atrás los alisados y tratamientos agresivos no es solo un cambio capilar: es un acto de amor propio y reconexión con tu identidad.",
    body: `
      <h3>Tu cabello no necesita encajar, necesita ser cuidado</h3>
      <p>Durante años, a muchas nos enseñaron que el cabello 'presentable' era únicamente el cabello liso y sin volumen. Este estándar nos llevó a someter nuestras fibras a planchas calientes, queratinas y químicos que apagaban la vitalidad natural de nuestros crespos.</p>
      
      <h4>El viaje hacia la aceptación</h4>
      <p>Aprender a querer tus rizos es un proceso que requiere paciencia. Habrá días de transición, días de reencuentro y días en los que tu cabello tendrá su propia personalidad. Y eso está perfectamente bien: tu cabello te hace resaltar en cualquier lugar.</p>
      
      <h4>Un santuario para tu libertad</h4>
      <p>En Soy Crespa Naturalmente no buscamos domar tu cabello; buscamos brindarle los nutrientes, la técnica y el respeto que merece para que lo luzcas con total orgullo y seguridad.</p>
    `
  },
  {
    id: "rizos-en-tendencia",
    title: "Rizos en Tendencia: Modas y Estilos para Cabello Crespo y Ondulado",
    category: "Estilo & Cortes",
    readTime: "4 min de lectura",
    image: "assets/images/web/tip-tendencias.jpg",
    excerpt: "Desde cortes shaggy con flequillo rizado hasta coronas afro imponentes: descubre las formas y estilos que dominan la escena actual.",
    body: `
      <h3>La era del volumen y la personalidad</h3>
      <p>Los tiempos de aplastar los rizos quedaron en el pasado. Hoy en día las tendencias celebran las texturas vivas, los cortes escalonados y el volumen libre que enmarca el rostro con dinamismo.</p>
      
      <h4>El corte en capas y efecto halo</h4>
      <p>Las capas cortas y medianas permiten que los rizos superiores no pesen sobre los inferiores, logrando una silueta redondeada y armoniosa que estiliza los rasgos faciales.</p>
      
      <h4>Flequillos crespos: el toque moderno</h4>
      <p>Atrás quedó el mito de que las personas con cabello crespo no pueden llevar flequillo. Un flequillo rizado bien cortado en seco aporta un aire juvenil, fresco y sumamente editorial.</p>
    `
  }
];

// Preguntas Frecuentes Reales (FAQ)
const FAQ_DATA = [
  {
    category: "Servicios y Citas",
    question: "¿Qué servicios ofrece Soy Crespa Naturalmente?",
    answer: "Ofrecemos servicios especializados exclusivamente en cabello ondulado, crespo y afro: Cortes especializados en seco para mujeres, hombres y niños; Definición Soñada y Express; Tratamientos intensivos de nutrición e hidratación capilar; Ozonoterapia capilar purificante; y nuestros paquetes combinados como '¡Pa' que te enamores de tus crespos!'."
  },
  {
    category: "Servicios y Citas",
    question: "¿Cómo solicito una cita?",
    answer: "Puedes solicitar tu cita directamente a través de nuestro botón oficial de WhatsApp (+57 312 717 9616) o mediante nuestro flujo guiado en la web. Al enviar el mensaje, nuestro equipo te responderá con los horarios disponibles de la semana para coordinar y confirmar tu fecha."
  },
  {
    category: "Tarifas y Precios",
    question: "¿Por qué algunos precios varían según la densidad capilar?",
    answer: "La densidad capilar se refiere a la cantidad total de hebras por centímetro cuadrado. Un cabello con densidad alta o extra alta requiere significativamente mayor tiempo de trabajo rizo por rizo y mayor cantidad de producto especializado que un cabello de densidad baja o media. Mostrar tarifas diferenciadas nos permite cobrar de manera justa y transparente."
  },
  {
    category: "Tarifas y Precios",
    question: "¿Cómo se confirman las tarifas pendientes de cotizar?",
    answer: "Para servicios como cortes masculinos o definiciones express, puedes enviarnos una foto actual de tu cabello por WhatsApp. Nuestro equipo evaluará la longitud, densidad y estado de tu fibra para confirmarte la tarifa exacta antes de tu cita."
  },
  {
    category: "Ubicación y Horarios",
    question: "¿Dónde están ubicados en Pereira?",
    answer: "Nos encontramos en el Centro de Pereira, en la Carrera 9 #21-72, Pereira, Risaralda, Colombia. Es una ubicación de fácil acceso en el corazón de la ciudad."
  },
  {
    category: "Ubicación y Horarios",
    question: "¿Cuáles son los horarios de atención del salón?",
    answer: "Atendemos de lunes a viernes de 9:00 a. m. a 5:30 p. m. (los miércoles recomendamos confirmar disponibilidad previamente por WhatsApp) y los sábados de 9:00 a. m. a 5:00 p. m. Los domingos permanecemos cerrados."
  },
  {
    category: "Cuidados & Procedimiento",
    question: "¿Qué incluye el paquete '¡Pa' que te enamores de tus crespos!'?",
    answer: "Es nuestra experiencia más completa e incluye: diagnóstico capilar personalizado, corte de puntas y forma, tratamiento nutritivo profundo, lavado respetuoso, definición personalizada, secado profesional con difusor y una clase práctica donde te enseñamos cómo cuidar y definir tus rizos en casa."
  },
  {
    category: "Cuidados & Procedimiento",
    question: "¿Qué debo hacer el día de mi cita?",
    answer: "Recomendamos asistir con el cabello limpio o con 1 a 2 días de lavado, desenredado previamente en casa de manera suave y con su textura natural (evitar llevarlo recogido en colas apretadas, trenzas muy tensas o con geles extra fuertes que deformen el patrón natural del rizo)."
  }
];
