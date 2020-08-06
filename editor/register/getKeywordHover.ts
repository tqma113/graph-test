const getKeywordHover = (keyword: string) => {
  switch (keyword) {
    case 'goto': 
      return [
        {
          value: 'goto'
        },
        {
          value: 'Enter another progress.'
        }
      ]
    case 'start':
      return [
        {
          value: 'start'
        },
        {
          value: 'Set the progress as a enterance.'
        }
      ]
    default:
      return []
  }
}

export default getKeywordHover