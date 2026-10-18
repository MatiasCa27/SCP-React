const products = [
  {
    id: 1,
    name: 'SCP-262',
    description: 'Un abrigo de muchos usos.',
    longDescription: 'SCP-262 es un abrigo de apariencia convencional que posee la capacidad anómala de manifestar múltiples extremidades desde el interior de su forro. Cuando el usuario abre la prenda, pueden aparecer brazos y manos de diferentes características, los cuales responden parcialmente a sus intenciones. Entre las extremidades observadas se encuentran brazos humanos, apéndices de gran longitud y estructuras de origen desconocido. Su utilización permite realizar diversas tareas simultáneamente, aunque el contacto prolongado con las extremidades puede representar riesgos biológicos para el portador. Se recomienda utilizar el objeto con precaución y evitar el contacto directo con manifestaciones desconocidas.',
    price: 45000,
    stock: 12,
    image: '/images/scp-262.webp'
  },
  {
    id: 2,
    name: 'SCP-268',
    description: 'Gorra de negligencia.',
    longDescription: 'SCP-268 es una gorra de apariencia común que produce un efecto anómalo sobre la percepción de quienes observan a su portador. Mientras se encuentra en uso, las personas cercanas tienden a ignorar su presencia, considerándolo parte habitual del entorno. Este fenómeno dificulta que los observadores recuerden detalles específicos del individuo, incluso después de haber interactuado con él. El efecto no corresponde a una invisibilidad física, por lo que el usuario puede continuar apareciendo en fotografías y grabaciones. Su funcionamiento depende principalmente de la alteración de la atención y la memoria de los observadores. Se recomienda evitar su utilización en situaciones donde sea necesario mantener contacto visual o recibir asistencia de otras personas.',
    price: 32000,
    stock: 25,
    image: '/images/scp-268.webp'
  },
  {
    id: 3,
    name: 'SCP-311',
    description: 'Guantes tácticos.',
    longDescription: 'SCP-311 consiste en un par de guantes de apariencia táctica que presentan propiedades anómalas relacionadas con la percepción del dolor. Cuando ambos guantes son utilizados simultáneamente, las sensaciones físicas y los traumatismos recibidos en las manos del portador pueden ser transferidos a otro individuo. El fenómeno parece estar relacionado con la persona en la que el usuario concentra su atención, aunque su funcionamiento exacto no ha sido determinado. Para que el efecto se manifieste, el portador no debe ser consciente de las propiedades del objeto. Los guantes no proporcionan protección general al resto del cuerpo ni eliminan la fatiga física. Su utilización requiere precaución debido a las posibles consecuencias sobre terceros.',
    price: 28000,
    stock: 18,
    image: '/images/scp-311.webp'
  },
  {
    id: 4,
    name: 'SCP-362',
    description: 'Una camiseta cool.',
    longDescription: 'SCP-362 es una camiseta de algodón de color azul claro que presenta el logotipo de un antiguo programa infantil de televisión. La prenda corresponde a una talla mediana y muestra signos moderados de desgaste asociados con su antigüedad, aunque conserva una estructura en buenas condiciones. Su composición ha sido identificada como algodón en su totalidad. A pesar de su apariencia ordinaria, el objeto presenta propiedades anómalas que pueden alterar la percepción del entorno de quien lo utiliza. Se han registrado manifestaciones visuales de figuras humanoides y posibles efectos psicológicos adversos durante su uso. Debido a estos antecedentes, se recomienda limitar la exposición y suspender inmediatamente su utilización ante cualquier alteración perceptiva.',
    price: 19000,
    stock: 14,
    image: '/images/scp-362.webp'
  },
  {
    id: 5,
    name: 'SCP-294',
    description: 'Una máquina de café única.',
    longDescription: 'SCP-294 es una máquina expendedora de bebidas cuya apariencia se asemeja a la de una cafetera comercial. Su principal característica es una pantalla de entrada que permite solicitar líquidos mediante un sistema de escritura similar a un teclado convencional. Después de recibir el pago correspondiente, la máquina procesa la solicitud y dispensa aproximadamente doce onzas del líquido indicado. Las pruebas realizadas han demostrado que puede producir una amplia variedad de sustancias, incluyendo bebidas habituales, compuestos industriales y materiales que normalmente se encuentran en estado sólido, siempre que puedan existir en forma líquida. Debido a la naturaleza de algunas sustancias obtenidas, se recomienda verificar cuidadosamente cada solicitud y evitar el consumo de líquidos desconocidos.',
    price: 850000,
    stock: 3,
    image: '/images/scp-294.webp'
  },
  {
    id: 6,
    name: 'SCP-914',
    description: 'Una máquina de sueños.',
    longDescription: 'SCP-914 es un dispositivo mecánico de grandes dimensiones compuesto por una compleja estructura de engranajes, poleas, correas, resortes y otros mecanismos. Su funcionamiento se desarrolla mediante dos compartimentos identificados como Entrada y Resultado. Los objetos introducidos en la primera cámara son procesados de acuerdo con una configuración seleccionada por el operador. El dispositivo dispone de cinco niveles de procesamiento: Brusco, Tosco, 1:1, Fino y Muy Fino. Dependiendo de la configuración utilizada, los objetos pueden experimentar modificaciones físicas, estructurales o funcionales de distinta magnitud. Los resultados no siempre son predecibles y determinadas combinaciones pueden generar materiales peligrosos o dispositivos inestables. Se recomienda realizar pruebas controladas y evitar introducir organismos vivos u objetos de naturaleza desconocida.',
    price: 2500000,
    stock: 2,
    image: '/images/scp-914.webp'
  }
];

export default products;