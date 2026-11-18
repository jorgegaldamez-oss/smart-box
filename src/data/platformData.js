export const SPECIALTIES = [
  {
    id: 'alimentos',
    name: 'Elaboración Industrial de Alimentos',
    shortName: 'Alimentos',
    color: 'cyan',
    recommendedTempMax: 4,
    recommendedHumMax: 75,
    tempRangeLabel: '0°C – 4°C',
    humRangeLabel: '45% – 75%',
    cargoLabel: 'Lácteos, cárnicos y pulpas refrigeradas',
    alertTitle: 'Alerta Alimentos: Ruptura de cadena de frío',
    alertMessageTemp:
      '¡Peligro microbiológico! Sobre el límite crítico de temperatura, bacterias como Salmonella o Listeria se multiplican rápidamente.',
    alertMessageHum:
      'Exceso de humedad: riesgo de condensación en envases, deterioro de etiquetas y proliferación de mohos.',
    mission:
      'Definir los protocolos HACCP, establecer los Puntos Críticos de Control (PCC), asegurar la trazabilidad de lotes y validar la lógica de alarma ante rupturas térmicas.',
    pccFocus: [
      'PCC-1: Temperatura de cámara en rango de refrigeración (0°C a 4°C).',
      'PCC-2: Tiempo máximo fuera de rango (tolerancia < 15 minutos).',
      'Registro continuo de datos (datalogger) para trazabilidad sanitaria.',
    ],
    keyHardware: [
      'Sensor: Sonda NTC/PT100 de grado alimentario (acero inoxidable).',
      'Controlador: Lógica de alarma temprana + registro con marca de tiempo.',
      'Actuador: Celda Peltier / compresor + baliza sonora y visual.',
    ],
    checklist: [
      'Definir Límites Críticos (ej. máx. 4°C) según ficha técnica del alimento.',
      'Verificar calibración de la sonda térmica en agua con hielo (0°C).',
      'Probar disparo de alarma cuando la temperatura supera el umbral por > 5 s.',
      'Validar que el registro de trazabilidad guarde fecha, hora y valor.',
      'Confirmar plan de acción correctiva si falla el enfriamiento en ruta.',
    ],
  },
  {
    id: 'quimica',
    name: 'Química Industrial',
    shortName: 'Química',
    color: 'emerald',
    recommendedTempMax: 20,
    recommendedHumMax: 45,
    tempRangeLabel: '10°C – 20°C',
    humRangeLabel: '20% – 45%',
    cargoLabel: 'Reactivos higroscópicos y soluciones patrón',
    alertTitle: 'Alerta Química: Degradación o hidratación de reactivos',
    alertMessageTemp:
      'Aumento de temperatura acelera reacciones indeseadas, volatilización de solventes y pérdida de concentración molar.',
    alertMessageHum:
      'Humedad crítica detectada: los reactivos higroscópicos absorben agua del aire, alterando su pureza y masa real.',
    mission:
      'Calibrar y validar los sensores (curvas de error), formular cartuchos desecantes (sílica gel / zeolita) y paquetes de cambio de fase (PCM) para estabilidad térmica y química.',
    pccFocus: [
      'PCC-1: Humedad relativa estricta (< 45% HR) para evitar hidrólisis.',
      'PCC-2: Estabilidad térmica (< 20°C) para evitar descomposición de reactivos.',
      'Control de hermeticidad ante gases o vapores corrosivos.',
    ],
    keyHardware: [
      'Sensor: Higrómetro capacitivo de alta precisión + sonda PT100.',
      'Controlador: Comparador de histéresis para evitar ciclos erráticos.',
      'Actuador: Cartucho desecante activo con flujo forzado + compuerta servo.',
    ],
    checklist: [
      'Preparar curva de calibración comparando sensor digital vs. patrón certificado.',
      'Pesar y activar cartucho desecante (sílica gel indicadora) antes del viaje.',
      'Verificar compatibilidad química de los materiales internos del contenedor.',
      'Medir tasa de saturación del desecante frente a humedad extrema (> 85% HR).',
      'Etiquetar reactivos según normativa SGA / NCh 382 antes de cargar.',
    ],
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    shortName: 'Gastronomía',
    color: 'amber',
    recommendedTempMax: 5,
    recommendedHumMax: 70,
    tempRangeLabel: '1°C – 5°C',
    humRangeLabel: '50% – 70%',
    cargoLabel: 'Preparaciones listas, masas finas y mise en place',
    alertTitle: 'Alerta Gastronomía: Riesgo de inocuidad (BPM) y calidad',
    alertMessageTemp:
      '¡Zona de Peligro Térmico (5°C - 60°C)! Riesgo de pérdida de inocuidad, textura y calidad organoléptica.',
    alertMessageHum:
      'Humedad fuera de rango: las preparaciones pierden crocantez, se resecan o generan condensación superficial.',
    mission:
      'Diseñar la estiba interna para garantizar flujo de aire homogéneo, aplicar Buenas Prácticas de Manufactura (BPM), controlar temperatura de núcleo y preservar atributos organolépticos.',
    pccFocus: [
      'PCC-1: Temperatura de núcleo del producto (< 5°C en frío).',
      'PCC-2: Humedad controlada para evitar resecamiento o reblandecimiento.',
      'Separación física de preparaciones para evitar contaminación cruzada.',
    ],
    keyHardware: [
      'Sensor: Termómetro de penetración (núcleo) + sensor ambiental de cabina.',
      'Controlador: Perfil dual (refrigeración suave sin congelar el alimento).',
      'Actuador: Ventilador de circulación interna + difusor de aire frío.',
    ],
    checklist: [
      'Sanitizar bandejas y contenedores internos aplicando protocolo BPM.',
      'Organizar la estiba dejando canales de ventilación de al menos 3 cm.',
      'Medir temperatura de núcleo antes de sellar la Smart-Box.',
      'Verificar que el flujo del ventilador no reseque directamente masas o salsas.',
      'Evaluar olor, color, textura y sabor (ficha organoléptica) al llegar a destino.',
    ],
  },
  {
    id: 'madera',
    name: 'Muebles y Terminaciones en Madera',
    shortName: 'Madera',
    color: 'orange',
    recommendedTempMax: 25,
    recommendedHumMax: 55,
    tempRangeLabel: '15°C – 25°C',
    humRangeLabel: '35% – 55%',
    cargoLabel: 'Piezas enchapadas, ensambles finos y maderas nobles',
    alertTitle: 'Alerta Madera: Riesgo de hinchazón, pandeo y ataque fúngico',
    alertMessageTemp:
      'Calor excesivo: riesgo de ablandamiento de adhesivos PVA/PUR y deformación de recubrimientos o barnices.',
    alertMessageHum:
      'Humedad elevada: la madera absorbe agua, se hincha, sufre alabeo/pandeo y pierde precisión en los ensambles.',
    mission:
      'Construir la estructura física de la Smart-Box, diseñar las capas de aislamiento térmico, lograr hermeticidad con burletes y proteger las piezas de madera contra pandeo y hongos.',
    pccFocus: [
      'PCC-1: Humedad relativa estable (35% - 55% HR) para mantener humedad de equilibrio.',
      'PCC-2: Diferencial térmico controlado para evitar choques térmicos en barnices.',
      'Integridad estructural y hermeticidad de juntas y sellos.',
    ],
    keyHardware: [
      'Sensor: Higrómetro de cabina + sensor de humedad de contacto en madera.',
      'Controlador: Regulación gradual para evitar cambios bruscos de %HR.',
      'Actuador: Compuerta servo de ventilación controlada + deshumidificador.',
    ],
    checklist: [
      'Cortar y ensamblar estructura multicapa con aislante térmico (ej. poliestireno/poliuretano).',
      'Instalar burletes de goma EPDM en tapa y compuertas para sellado hermético.',
      'Aplicar barrera de vapor o sellador protector en las caras internas.',
      'Verificar escuadra, uniones y ausencia de puentes térmicos en esquinas.',
      'Realizar prueba de estanqueidad (luz o humo) antes de montar la electrónica.',
    ],
  },
];

export const CONCEPTS = [
  {
    id: 'pcc',
    number: '01',
    title: 'PCC (Punto Crítico de Control)',
    subtitle: 'La línea roja que protege la carga',
    badge: 'SEGURIDAD Y CALIDAD',
    accent: 'amber',
    everydayAnalogy:
      'Es como la fiebre en el cuerpo humano: hasta 37°C estás bien, pero si pasas de 38°C (Límite Crítico), el cuerpo activa alarmas porque algo anda mal.',
    explanation:
      'Un Punto Crítico de Control (PCC) es una etapa o variable del proceso donde podemos medir y actuar para evitar que el producto se arruine. Cada PCC tiene un Límite Crítico numérico exacto (por ejemplo: Temperatura máxima 4°C o Humedad máxima 55%).',
    industrialExample:
      'En una Smart-Box con lácteos, si el interior sube a 7°C durante más de 15 minutos, se rompe la cadena de frío y el lote completo debe descartarse por seguridad alimentaria.',
    keyFormula: 'Variable medida <= Límite Crítico  ➔  CARGA SEGURA',
  },
  {
    id: 'sensor',
    number: '02',
    title: 'Sensor (Los Sentidos del Sistema)',
    subtitle: 'De magnitud física a señal eléctrica',
    badge: 'ENTRADA / INPUT',
    accent: 'cyan',
    everydayAnalogy:
      'Son como tus ojos y tu piel: sienten si hace frío o calor y envían impulsos nerviosos al cerebro para avisarle.',
    explanation:
      'Un sensor (o transductor) detecta una variable del mundo real —como temperatura, humedad, luz o presión— y la convierte en una señal eléctrica (voltaje o datos digitales) que un computador puede leer.',
    industrialExample:
      'Sonda NTC o PT100 (cambia su resistencia eléctrica según la temperatura) e Higrómetro Capacitivo (cambia su capacitancia eléctrica según la humedad del aire).',
    keyFormula: 'Temperatura (°C) / Humedad (%HR)  ➔  Voltaje (mV) / Señal Digital',
  },
  {
    id: 'controller',
    number: '03',
    title: 'Controlador Programable (El Cerebro)',
    subtitle: 'Toma decisiones en milisegundos',
    badge: 'PROCESAMIENTO',
    accent: 'emerald',
    everydayAnalogy:
      'Es el cerebro que lee la información de la piel ("¡qué calor!") y decide la orden ("¡enciende el ventilador!").',
    explanation:
      'El controlador recibe las lecturas de los sensores, las compara con el Límite Crítico (Setpoint) que programamos y ejecuta reglas lógicas sin descanso: SI (Sensor > Límite) ENTONCES (Activar Salida).',
    industrialExample:
      'En prototipos escolares usamos Microcontroladores (Arduino / ESP32 con WiFi). En fábricas y camiones reales se usan PLC (Controladores Lógicos Programables), diseñados para resistir vibraciones, polvo y ruido eléctrico 24/7.',
    keyFormula: 'SI (Temp_Interna > Setpoint) ENTONCES (Encender_Peltier = ON)',
  },
  {
    id: 'actuator',
    number: '04',
    title: 'Actuador (Los Músculos del Sistema)',
    subtitle: 'De señal eléctrica a acción física',
    badge: 'SALIDA / OUTPUT',
    accent: 'rose',
    everydayAnalogy:
      'Son tus manos y piernas: reciben la orden del cerebro y ejecutan una acción física real, como abrir una ventana o prender el aire acondicionado.',
    explanation:
      'Un actuador transforma la señal eléctrica de baja potencia que envía el controlador en fuerza, movimiento, frío, calor, luz o sonido para corregir la variable que salió de rango.',
    industrialExample:
      'Celda Peltier + ventilador (extraen calor), servomotor (abre o cierra una compuerta de aire), deshumidificador/cartucho activo (baja la humedad) y baliza LED/buzzer (alerta al conductor).',
    keyFormula: 'Orden Digital (5V / 24V)  ➔  Frío / Movimiento / Alarma',
  },
  {
    id: 'loop',
    number: '05',
    title: 'Lazo de Control (Abierto vs. Cerrado)',
    subtitle: 'La diferencia entre adivinar y controlar',
    badge: 'AUTOMATIZACIÓN 4.0',
    accent: 'cyan',
    everydayAnalogy:
      'Lazo Abierto es una tostadora con reloj: tuesta 3 minutos aunque el pan ya se esté quemando. Lazo Cerrado es un aire acondicionado con termostato: mide la sala y se regula solo.',
    explanation:
      'En un Lazo Abierto no hay retroalimentación: el sistema actúa "a ciegas". En un Lazo Cerrado (Feedback), el sensor mide continuamente el resultado, lo devuelve al controlador y este ajusta los actuadores hasta estabilizar la Smart-Box.',
    industrialExample:
      'Si el camión entra al desierto a 42°C, un sistema de Lazo Cerrado detecta el alza térmica al instante y aumenta la potencia de enfriamiento automáticamente.',
    keyFormula: 'Sensor ➔ Controlador ➔ Actuador ➔ Smart-Box ↺ (Retroalimentación)',
  },
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question:
      'Durante la ruta, la temperatura interna de la Smart-Box sube a 12°C (límite: 4°C). El sensor marca 12°C en pantalla y el controlador envía la orden de encendido, pero el ventilador y la celda Peltier no reaccionan. ¿Qué componente del lazo de control está fallando?',
    options: [
      'El Sensor, porque no logra medir la temperatura del aire interno',
      'El Actuador, porque recibe la orden pero no ejecuta la acción',
      'El Límite Crítico, porque está mal configurado en el sistema',
      'El Aislante Térmico, porque deja entrar calor desde el exterior',
    ],
    correctIndex: 1,
    explanation:
      '¡Exacto! El sensor midió bien (12°C) y el controlador procesó la lógica y envió la orden. El fallo está en el actuador (ventilador/Peltier o su etapa de potencia), que es el "músculo" encargado de enfriar.',
  },
  {
    id: 2,
    question:
      '¿Cuál es la principal diferencia entre un sistema de Lazo Abierto y uno de Lazo Cerrado en nuestra Smart-Box?',
    options: [
      'El Lazo Abierto usa sensores digitales más rápidos que el Lazo Cerrado',
      'El Lazo Cerrado opera únicamente cuando el camión está estacionado',
      'El Lazo Cerrado mide la variable real y corrige de forma automática',
      'El Lazo Abierto corrige la temperatura usando un algoritmo predictivo',
    ],
    correctIndex: 2,
    explanation:
      'En un Lazo Cerrado existe retroalimentación continua: el sensor informa al controlador el estado real de la caja para que corrija si algo cambia afuera.',
  },
  {
    id: 3,
    question:
      'Si transportamos piezas de madera fina enchapada por una zona selvática con 90% de humedad exterior, ¿qué problema principal evitamos manteniendo el PCC de humedad bajo 55%?',
    options: [
      'Que los reactivos químicos cambien su pureza y concentración molar',
      'Que la madera absorba agua, sufra pandeo y sea atacada por hongos',
      'Que las preparaciones gastronómicas pierdan su textura y sabor',
      'Que el microcontrolador pierda su programación por corte eléctrico',
    ],
    correctIndex: 1,
    explanation:
      'La madera es un material higroscópico: si sube la humedad relativa, absorbe agua, se dilata/pandéa arruinando ensambles de precisión y favoreciendo hongos.',
  },
  {
    id: 4,
    question:
      '¿Qué papel cumple la lógica "SI (Sensor > Límite) ENTONCES (Activar Salida)" dentro de la Smart-Box?',
    options: [
      'Es la regla de decisión que ejecuta el Controlador Programable',
      'Es la fórmula química para fabricar el cartucho de sílica gel',
      'Es el protocolo sanitario para sanitizar bandejas de alimentos',
      'Es el diseño estructural del burlete que sella la compuerta',
    ],
    correctIndex: 0,
    explanation:
      'El controlador programable evalúa constantemente esa condición lógica comparando la lectura del sensor contra el Setpoint (PCC).',
  },
  {
    id: 5,
    question:
      'En una falla de sellado (puerta mal cerrada o burlete dañado), ¿por qué las 4 especialidades deben trabajar juntas para resolverlo?',
    options: [
      'Porque Muebles repara el sello y las demás áreas solo observan el viaje',
      'Porque cada especialidad protege una parte crítica del sistema integrado',
      'Porque cada especialidad debe transportar su carga en un camión distinto',
      'Porque así pueden apagar los sensores en ruta y ahorrar energía eléctrica',
    ],
    correctIndex: 1,
    explanation:
      '¡Visión Industria 4.0! Un prototipo transversal funciona como un sistema integrado donde estructura física, química de control, inocuidad y trazabilidad dependen unas de otras.',
  },
];

