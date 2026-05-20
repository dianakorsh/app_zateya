export interface Activity {
  id: number;
  image: string;
  category: string;
  audience: string;
  title: string;
  schedule: string;
  price: number;
  distance: number;
  description: string;
  address: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    category: 'еда',
    audience: 'для всех',
    title: 'Церемония чайная, эмоции личные',
    schedule: 'ежедневно',
    price: 900,
    distance: 3.1,
    description: 'Погрузись в традиции чайной церемонии. Мастер проведёт тебя через все этапы заваривания улунов и пуэров. Никакого шума, только аромат и медитативная тишина.',
    address: 'Москва, Чистые пруды, 12',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    category: 'культура',
    audience: 'для всех',
    title: 'Озеленить дом',
    schedule: 'ежедневно',
    price: 1500,
    distance: 4.9,
    description: 'Мастер-класс по уходу за комнатными растениями. Выберешь свой первый суккулент или редкий фикус, узнаешь как не убить его за неделю.',
    address: 'Москва, Арбат, 5',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    category: 'спорт',
    audience: 'для всех',
    title: 'Велопрогулка по набережной',
    schedule: 'сб-вс',
    price: 500,
    distance: 1.2,
    description: 'Групповой заезд по живописным набережным Москвы. 15 км в расслабленном темпе, фотостопы, кофе на финише.',
    address: 'Москва, Лужники',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80',
    category: 'ночная жизнь',
    audience: 'для компании',
    title: 'Барная вечеринка в стиле Techno',
    schedule: 'пт-сб',
    price: 1800,
    distance: 2.7,
    description: 'Резидент из Берлина за пультом. 4 часа танцев в андеграундном пространстве с живым светом.',
    address: 'Москва, Флакон, Дизайн-завод',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    category: 'культура',
    audience: 'один',
    title: 'Выставка современного искусства',
    schedule: 'вт-вс',
    price: 600,
    distance: 5.3,
    description: 'Камерная выставка молодых художников о городе и одиночестве. 30 работ, аудиогид в подарок.',
    address: 'Москва, Винзавод',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    category: 'еда',
    audience: 'в паре',
    title: 'Кулинарный мастер-класс',
    schedule: 'ср, пт',
    price: 3500,
    distance: 3.8,
    description: 'Шеф-повар ресторана учит готовить итальянскую пасту с нуля. Съедаете всё вместе за бокалом вина.',
    address: 'Москва, Патриаршие',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    category: 'спорт',
    audience: 'для всех',
    title: 'Йога на рассвете в парке',
    schedule: 'пн, ср, пт',
    price: 0,
    distance: 0.8,
    description: 'Бесплатная утренняя практика на свежем воздухе. Инструктор, коврики, горячий чай после — всё включено.',
    address: 'Москва, Парк Горького',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    category: 'культура',
    audience: 'один',
    title: 'Книжный клуб без занудства',
    schedule: 'каждое воскресенье',
    price: 200,
    distance: 2.1,
    description: 'Обсуждаем одну книгу за 2 часа, пьём кофе, спорим. Без домашних заданий — можно приходить просто поговорить.',
    address: 'Москва, Бумажная фабрика',
  },
];
