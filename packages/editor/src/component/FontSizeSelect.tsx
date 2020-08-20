import React from 'react'

export type FontSizeSelectProps = {
  value?: number
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const fontSizes = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 42, 48, 56]

export const FontSizeSelect = ({
  value = 12,
  onChange,
}: FontSizeSelectProps) => {
  return (
    <span>
      <span>字号</span>
      <select value={value} onChange={onChange}>
        {fontSizes.map((fontSize) => {
          return (
            <option key={fontSize} value={fontSize}>
              {fontSize}
            </option>
          )
        })}
      </select>
    </span>
  )
}
