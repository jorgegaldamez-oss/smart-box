export const TRANSPORT_ORDERS = {
  alimentos: {
    id: 'alimentos',
    orderCode: 'ORD-2026-ALIM-01',
    specialtyName: 'Elaboración Industrial de Alimentos',
    title: 'Cadena de Frío: Lácteos y Pulpas Frescas',
    cargo: '1.200 kg de yogurt probiótico y pulpa de fruta pasteurizada',
    route: 'Planta Los Lagos ➔ Centro de Distribución Norte (840 km)',
    technicalSheet:
      'PROTOCOLO HACCP-04: La carga debe mantenerse estrictamente refrigerada entre 1°C (mínimo para evitar congelación y ruptura de emulsión) y 4°C (máximo para frenar proliferación de Listeria y Salmonella). La humedad relativa dentro de la Smart-Box no debe superar el 70% HR para evitar condensación en los sellos de los envases.',
    expectedPCC: {
      tempMin: 1,
      tempMax: 4,
      humMax: 70,
    },
    hints: {
      tempMinTooLow:
        'Temperatura mínima muy baja: debajo de 1°C el producto se congela y daña la textura del yogurt.',
      tempMinTooHigh:
        'Temperatura mínima demasiado alta: deja un margen de operación muy estrecho respecto al límite máximo.',
      tempMaxTooHigh:
        '¡Peligro! Tu rango máximo (> 4°C) permitiría proliferación bacteriana y ruptura de cadena de frío.',
      tempMaxTooLow:
        'El límite máximo es demasiado bajo para refrigeración estándar (revisa la ficha: 4°C).',
      humTooHigh:
        'Humedad máxima muy alta (> 70%): habría condensación sobre los envases y riesgo de mohos.',
      humTooLow:
        'Humedad máxima innecesariamente baja (< 60%): exigiría demasiado al deshumidificador sin necesidad.',
    },
  },
  quimica: {
    id: 'quimica',
    specialtyName: 'Química Industrial',
    title: 'Reactivos Higroscópicos y Soluciones Patrón',
    cargo: '450 kg de sales higroscópicas y estándares analíticos de laboratorio',
    route: 'Laboratorio Central ➔ Faena Minera Cordillera (690 km)',
    technicalSheet:
      'NORMA LAB-Q12: Los reactivos son altamente sensibles al calor y a la humedad ambiental. La temperatura interna debe mantenerse entre 12°C (mínimo para evitar cristalización de soluciones) y 20°C (máximo para evitar descomposición térmica). La humedad relativa máxima permitida es 45% HR para impedir que las sales absorban agua del aire.',
    expectedPCC: {
      tempMin: 12,
      tempMax: 20,
      humMax: 45,
    },
    hints: {
      tempMinTooLow:
        'Temperatura mínima muy baja (< 12°C): las soluciones patrón podrían precipitar o cristalizar.',
      tempMinTooHigh:
        'Temperatura mínima demasiado alta respecto al rango de la ficha técnica (12°C).',
      tempMaxTooHigh:
        'Rango máximo excesivo (> 20°C): aceleraría la degradación térmica y volatilización de reactivos.',
      tempMaxTooLow:
        'Límite máximo muy bajo: revisa la ficha técnica (20°C).',
      humTooHigh:
        '¡Alerta Química! Sobre 45% HR los reactivos higroscópicos absorben humedad y pierden pureza.',
      humTooLow:
        'Humedad máxima demasiado estricta (< 35%): revisa el valor exacto de la ficha (45% HR).',
    },
  },
  gastronomia: {
    id: 'gastronomia',
    specialtyName: 'Gastronomía',
    title: 'Mise en Place y Masas Finas de Alta Cocina',
    cargo: '320 bandejas gastronómicas con preparaciones listas y masas laminadas',
    route: 'Cocina Central ➔ Centro de Eventos Costero (520 km)',
    technicalSheet:
      'ESTÁNDAR BPM-G08: Para garantizar inocuidad y calidad organoléptica, las preparaciones deben viajar entre 2°C (mínimo para no quemar por frío las hojas y masas) y 5°C (máximo antes de entrar en Zona de Peligro Térmico). La humedad relativa máxima es 65% HR para conservar la textura sin reblandecer.',
    expectedPCC: {
      tempMin: 2,
      tempMax: 5,
      humMax: 65,
    },
    hints: {
      tempMinTooLow:
        'Debajo de 2°C se forman cristales de hielo que arruinan la textura de las preparaciones.',
      tempMinTooHigh:
        'Temperatura mínima muy alta: revisa el valor indicado en la ficha técnica (2°C).',
      tempMaxTooHigh:
        '¡Zona de Peligro Térmico! Sobre 5°C aumenta el riesgo de contaminación microbiológica (BPM).',
      tempMaxTooLow:
        'El límite máximo es más bajo de lo indicado en la ficha (5°C).',
      humTooHigh:
        'Sobre 65% HR las masas laminadas pierden crocantez y se humedecen.',
      humTooLow:
        'Humedad máxima demasiado baja (< 55%): podría resecar las preparaciones.',
    },
  },
  madera: {
    id: 'madera',
    specialtyName: 'Muebles y Terminaciones en Madera',
    title: 'Piezas Enchapadas y Ensambles de Precisión',
    cargo: '85 módulos de madera noble con barniz poliuretano y uniones espiga',
    route: 'Taller Maderero Sur ➔ Proyecto Hotelero Norte (910 km)',
    technicalSheet:
      'FICHA MAD-09: La madera es higroscópica y sufre pandeo o hinchazón si absorbe agua. Debe viajar entre 15°C (mínimo para proteger la elasticidad del barniz) y 25°C (máximo para no ablandar adhesivos PVA). La humedad relativa máxima permitida es 55% HR para mantener la humedad de equilibrio y evitar ataque fúngico.',
    expectedPCC: {
      tempMin: 15,
      tempMax: 25,
      humMax: 55,
    },
    hints: {
      tempMinTooLow:
        'Debajo de 15°C el barniz puede sufrir choque térmico y micro-fisuras.',
      tempMinTooHigh:
        'Temperatura mínima muy alta respecto al estándar de la ficha (15°C).',
      tempMaxTooHigh:
        'Sobre 25°C los adhesivos y terminaciones corren riesgo de ablandamiento.',
      tempMaxTooLow:
        'Límite máximo inferior al especificado en la ficha (25°C).',
      humTooHigh:
        '¡Alerta Madera! Sobre 55% HR la madera absorbe humedad, sufre pandeo y riesgo de hongos.',
      humTooLow:
        'Humedad máxima demasiado baja (< 45%): podría resecar la madera y provocar grietas.',
    },
  },
};

export const HARDWARE_SENSORS = [
  {
    id: 'ntc',
    name: 'Sonda NTC / PT100',
    category: 'Temperatura',
    desc: 'Mide temperatura interna en °C con alta precisión.',
    correct: true,
  },
  {
    id: 'hygrometer',
    name: 'Higrómetro Capacitivo',
    category: 'Humedad',
    desc: 'Mide Humedad Relativa (%HR) dentro de la cabina.',
    correct: true,
  },
  {
    id: 'ultrasonic',
    name: 'Sensor Ultrasónico de Proximidad',
    category: 'Distancia',
    desc: 'Mide distancia a obstáculos en cm (usado en robots/estacionamiento).',
    correct: false,
  },
  {
    id: 'level',
    name: 'Sensor de Nivel de Líquido',
    category: 'Nivel',
    desc: 'Detecta altura de agua dentro de un estanque.',
    correct: false,
  },
];

export const HARDWARE_ACTUATORS = [
  {
    id: 'peltier',
    name: 'Celda Peltier + Ventilador',
    category: 'Térmico',
    desc: 'Extrae calor de la Smart-Box cuando sube la temperatura.',
    correct: true,
  },
  {
    id: 'dehumidifier',
    name: 'Compuerta + Cartucho Deshumidificador',
    category: 'Humedad',
    desc: 'Reduce la humedad interna circulando aire por sílica gel/desecante.',
    correct: true,
  },
  {
    id: 'beacon',
    name: 'Baliza de Alarma Sonora/Visual',
    category: 'Seguridad',
    desc: 'Alerta al operador si una variable supera el Límite Crítico.',
    correct: true,
  },
  {
    id: 'piston',
    name: 'Pistón Hidráulico de Carga',
    category: 'Fuerza',
    desc: 'Levanta pallets pesados en bodega (no regula clima).',
    correct: false,
  },
  {
    id: 'heater',
    name: 'Resistencia Calefactora 2000W',
    category: 'Calor extremo',
    desc: 'Calienta hornos industriales hasta 250°C.',
    correct: false,
  },
];

export const ROUTE_LEGS = [
  {
    id: 1,
    name: 'Tramo 1: Ruta Normal (Valle Central)',
    durationSec: 45,
    extTemp: 21,
    extHum: 52,
    description: 'Clima templado y estable. Verifica que el lazo cerrado mantenga los PCC sin sobresaltos.',
    incident: null,
  },
  {
    id: 2,
    name: 'Tramo 2: Paso por Zona Árida (Desierto Norte)',
    durationSec: 50,
    extTemp: 42,
    extHum: 24,
    description: 'Radiación solar extrema y temperatura exterior de 42°C.',
    incident: {
      triggerAtSec: 22,
      title: 'INCIDENTE EN VIVO: Micro-fisura en sello de puerta',
      detail:
        'Una vibración en carretera abrió una micro-fisura en el burlete. ¡Entra aire caliente a 42°C y el enfriamiento normal no da abasto!',
      actionLabel: 'Activar Potencia Máxima Peltier + Cartucho Refrigerante Auxiliar',
      resolvedLabel: 'Potencia Máxima + Cartucho Auxiliar ACTIVADOS',
    },
  },
  {
    id: 3,
    name: 'Tramo 3: Paso por Zona Selvática / Costera',
    durationSec: 50,
    extTemp: 33,
    extHum: 92,
    description: 'Ambiente tropical saturado con 92% de humedad relativa exterior.',
    incident: {
      triggerAtSec: 22,
      title: 'INCIDENTE EN VIVO: Saturación de desecante y deriva de sensor',
      detail:
        'El cartucho principal se saturó por la humedad extrema y el sensor principal muestra lecturas erráticas.',
      actionLabel: 'Cambiar a Sensor Redundante + Abrir Compuerta de Ventilación Desecante Auxiliar',
      resolvedLabel: 'Sensor Redundante + Desecante Auxiliar EN LÍNEA',
    },
  },
];
