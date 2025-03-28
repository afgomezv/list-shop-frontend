export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
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
