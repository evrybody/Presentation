export interface GameItem {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  providerName: string;
  technologyType: string;
  hasLobby: boolean;
  isMobile: boolean;
  // has_freespins: 0 | 1;
  // has_tables: 0 | 1;
  // freespin_valid_until_full_day: 0 | 1;
  // label: string;

//   tags?: Tag[];
//   parameters?: GameParameters;
//   images?: GameImage[];
//   related_games?: RelatedGame[];
}

// Вспомогательные интерфейсы для расширений
// interface Tag {
//   id: number;          // Пример поля, обычно требуется ID тега
//   name: string;        // Название тега (например: "новинка", "топ")
//   slug?: string;       // Опционально: URL-идентификатор
// }

// interface GameParameters {
//   [key: string]: any;  // Динамическая структура параметров
//   // Примеры возможных конкретных полей:
//   // min_bet?: number;
//   // max_bet?: number;
//   // currencies?: string[];
// }

// interface GameImage {
//   url: string;         // URL изображения
//   type: string;        // Тип изображения (например: "banner", "thumbnail", "logo")
//   width?: number;      // Опционально: ширина
//   height?: number;     // Опционально: высота
// }

// interface RelatedGame {
//   uuid: string;        // UUID связанной игры
//   name: string;        // Название связанной игры
//   image: string;       // Основное изображение
//   provider: string;    // Провайдер
//   type?: string;       // Опционально: тип игры
// }