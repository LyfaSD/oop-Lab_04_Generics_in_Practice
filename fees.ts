interface Borrowable {
  lateFee(daysLate: number): number;
}

abstract class LibraryItem implements Borrowable {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  protected abstract feePerDay(): number;

  lateFee(daysLate: number): number {
    return daysLate * this.feePerDay();
  }

  describe(): string {
    return this.title;
  }
}

class Book extends LibraryItem {
  protected override feePerDay(): number {
    return 100;
  }
}

class Dvd extends LibraryItem {
  protected override feePerDay(): number {
    return 250;
  }
}

class Laptop implements Borrowable {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  lateFee(daysLate: number): number {
    return 5000 + daysLate * 1000;
  }
}

function totalFees(items: readonly Borrowable[], daysLate: number): number {
  return items.reduce((total, item) => total + item.lateFee(daysLate), 0);
}

function mostCostly<T extends Borrowable>(
  items: readonly T[],
  daysLate: number,
): T | undefined {
  let mostCostlyItem: T | undefined;
  let highestFee = -Infinity;

  for (const item of items) {
    const fee = item.lateFee(daysLate);
    if (fee > highestFee) {
      mostCostlyItem = item;
      highestFee = fee;
    }
  }

  return mostCostlyItem;
}

const novel = new Book("Things Fall Apart");
const film = new Dvd("Atlantics");
const laptop = new Laptop("LT-07");

console.log(totalFees([novel, film, laptop], 3));
console.log(totalFees([], 3));

const worst = mostCostly([novel, film], 3);
if (worst) console.log(worst.describe());

const worstOverall = mostCostly([novel, laptop], 3);
if (worstOverall) console.log(worstOverall.lateFee(3));
