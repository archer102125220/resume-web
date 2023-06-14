import { useSyncExternalStore } from 'react';

const AFrameStore = {
  eventEaxmple: {
    getKarigurashi(karigurashiMovieImage, lang = 'en') {
      const imgEl = document.querySelector(karigurashiMovieImage);
      if (lang === 'zh') {
        return {
          title: '《借物少女艾莉緹》（2010年）',
          imgEl,
          description:
            '根據瑪麗·諾頓（Mary Norton）於1952年所著的兒童小說《借物小人一家》改編，故事描述一個微小的家庭秘密地生活在典型住宅的牆壁和地板之間，他們從人類借用物品以求生存。'
        };
      }
      return {
        title: 'The Secret World of Arrietty (2010)',
        imgEl,
        description: 'Based on the 1952 novel The Borrowers by Mary Norton, an English author of children\'s books, about a family of tiny people who live secretly in the walls and floors of a typical household, borrowing items from humans to survive.'
      };
    },
    getKazetachinu(kazetachinuMovieImage, lang = 'en') {
      const imgEl = document.querySelector(kazetachinuMovieImage);
      if (lang === 'zh') {
        return {
          title: '《風起》（2013年）',
          imgEl,
          description:
            '《風起》是關於堀越二郎（1903年-1982年）的虛構傳記電影，他是三菱A5M戰鬥機及其後繼機種三菱A6M零式戰鬥機的設計師，這些戰鬥機在第二次世界大戰期間由日本帝國使用。電影改編自宮崎駿同名的漫畫，而該漫畫則部分基於堀達夫的1937年小說《風已起》以及堀越二郎的生平故事。'
        };
      }
      return {
        title: 'The Wind Rises (2013)',
        imgEl,
        description: 'The Wind Rises is a fictionalised biographical film of Jiro Horikoshi (1903, 1982), designer of the Mitsubishi A5M fighter aircraft and its successor, the Mitsubishi A6M Zero, used by the Empire of Japan during World War II. The film is adapted from Miyazaki\'s manga of the same name, which was in turn loosely based on both the 1937 novel The Wind Has Risen by Tatsuo Hori and the life of Jiro Horikoshi.'
      };
    },
    getPonyoMovieImage(ponyoMovieImage, lang = 'en') {
      const imgEl = document.querySelector(ponyoMovieImage);
      if (lang === 'zh') {
        return {
          title: '《崖上的波妞》（2003年）',
          imgEl,
          description:
            '這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。'
        };
      }
      return {
        title: 'Ponyo (2003)',
        imgEl,
        description:
          'It is the eighth film Miyazaki directed for Studio Ghibli, and his tenth overall. The film tells the story of Ponyo (Nara), a goldfish who escapes from the ocean and is rescued by a five-year-old human boy, Sōsuke (Doi) after she is washed ashore while trapped in a glass jar.'
      };
    }
  }
};
let listeners = [];
export const AFrameStoreSubscriber = {
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return AFrameStore;
  },
  getServerSnapshot() {
    return null;
  }
};
export function useAFrameStore() {
  return useSyncExternalStore(AFrameStoreSubscriber.subscribe, AFrameStoreSubscriber.getSnapshot, AFrameStoreSubscriber.getServerSnapshot);
}
