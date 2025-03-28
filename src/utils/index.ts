export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat("es-Es", {
    style: "currency",
    currency: "COP",
  }).format(quantity);
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("es-Es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
}
