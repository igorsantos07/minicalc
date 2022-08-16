const BUSINESS_DAYS_PER_YEAR = 252

export function interestYtoD(interest) {
  return Math.pow(interest + 1, 1 / BUSINESS_DAYS_PER_YEAR) - 1
}

export function irpf(days) {
  if (days < 180) return 0.225
  if (days < 360) return 0.2
  if (days < 720) return 0.175
                  return 0.15
}
