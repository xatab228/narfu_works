//@ts-ignore
import * as fs from "fs";

export class Product {
  date: string;
  quantity: number;
  name: string;
  invoiceNumber: string;
  price?: number;
  constructor(date: string, quantity: number, name: string, invoiceNumber: string) {
    this.date = date;
    this.quantity = quantity;
    this.name = name;
    this.invoiceNumber = invoiceNumber;
  }

  // Метод изменения цены товара
  changePrice(newPrice: number) {
    this.price = newPrice;
  }

  // Метод изменения количества товара
  changeQuantity(newQuantity: number) {
    this.quantity = newQuantity;
  }

  // Метод проверки введенных данных
  checkData() {
    if (!this.date) {
      throw new Error("Ошибка! Неверный формат даты поступления товара.");
    }

    if (!this.quantity || this.quantity <= 0) {
      throw new Error("Ошибка! Неверное количество товара.");
    }

    if (!this.name) {
      throw new Error("Ошибка! Неверное наименование товара.");
    }

    if (!this.invoiceNumber) {
      throw new Error("Ошибка! Неверный номер накладной товара.");
    }

    // Реализация дополнительных проверок, если необходимо
  }

  // Функция ввода данных в консоль
  static inputProductData() {
    const date = prompt("Введите дату поступления товара: ");
    const quantity = prompt("Введите количество товара: ");
    const name = prompt("Введите наименование товара: ");
    const invoiceNumber = prompt("Введите номер накладной товара: ");
    if (!date || !quantity || !name || !invoiceNumber) return;
    return new Product(date, +quantity, name, invoiceNumber);
  }

  // Функция вывода данных в файл
  static saveToFile(product: Product, fileName: string) {
    const data = `Дата поступления: ${product.date}\n` +
      `Количество: ${product.quantity}\n` +
      `Наименование: ${product.name}\n` +
      `Номер накладной: ${product.invoiceNumber}\n`;
    fs.writeFileSync(fileName, data); // Записываем данные в файл
    console.log(`Данные успешно сохранены в файл: ${fileName}`);
  }
  // Метод вывода информации о товаре в консоль
  printInfo() {
    console.log(`Дата поступления товара: ${this.date}`);
    console.log(`Количество товара: ${this.quantity}`);
    console.log(`Наименование товара: ${this.name}`);
    console.log(`Номер накладной товара: ${this.invoiceNumber}`);
  }

  // Перегрузка операции присваивания
  copy() {
    return new Product(this.date, this.quantity, this.name, this.invoiceNumber);
  }

  // Перегрузка операции сравнения
  isEqual(otherProduct: Product) {
    return this.invoiceNumber === otherProduct.invoiceNumber;
  }

  // Деструктор
  cleanup() {
    // Здесь можно добавить код для закрытия файла, освобождения ресурсов и т.д.
    console.log("Очистка ресурсов перед удалением объекта Товары");
  }

  // Метод, вызываемый перед удалением объекта
  // Не является стандартным деструктором, вызывается вручную
  destroy() {
    this.cleanup();
  }
}
