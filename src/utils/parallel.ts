import WorkerPath from './worker?worker&url'
import type {SortingMethods} from "@/utils/sortingFunctions";

export default interface ParallelOptions {
  sortingMethod: SortingMethods
}
export async function useParallel<T>(data: T[], options?: ParallelOptions){
  return await parallelSort(data, options)
}

function sortWorker<T>(arr: T[], options?: ParallelOptions) {
  return new Promise((resolve, reject) => {
    // Создаем новый веб-воркер
    const worker = new Worker(WorkerPath, {type: "module"});

    // Отправляем данные в веб-воркер
    const message = {
      data: arr,
      options
    }
    worker.postMessage(message);

    // Слушаем сообщения от веб-воркера
    worker.addEventListener('message', (event) => {
      resolve(event.data as T);
      worker.terminate(); // Завершаем работу веб-воркера
    });

    // Слушаем ошибки от веб-воркера
    worker.addEventListener('error', (error) => {
      reject(error);
      worker.terminate(); // Завершаем работу веб-воркера
    });
  });
}

// Основная функция для вызова распараллеленной сортировки
function parallelSort<T>(arr: T[], options?: ParallelOptions) {
  return new Promise(async (resolve) => {
    const chunkSize = Math.ceil(arr.length / navigator.hardwareConcurrency); // Определяем размер чанка
    const chunks = splitArrayIntoChunks(arr, chunkSize); // Разделяем массив на чанки

    const promises = chunks.map(chunk => sortWorker(chunk, options)); // Запускаем сортировку в веб-воркерах
    const sortedChunks = await Promise.all(promises); // Ждем, пока все веб-воркеры закончат работу

    const sortedArr = mergeSortedChunks(sortedChunks as Array<Array<T>>); // Сливаем отсортированные чанки
    resolve(sortedArr);
  });
}

// Вспомогательные функции

// Функция для разделения массива на чанки
function splitArrayIntoChunks<T>(arr: T[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

// Функция для слияния отсортированных чанков
function mergeSortedChunks<T>(chunks: Array<T[]>): T[] {
  return chunks.reduce((merged, chunk) => {
    return mergeArrays(merged, chunk);
  }, []);
}

// Функция для слияния двух отсортированных массивов
function mergeArrays<T>(arr1: T[], arr2: T[]): Array<T> {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }

  return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
}