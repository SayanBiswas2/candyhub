const chengeTheme = (doc,theme) => {
  switch(theme){
    case 'light':
        doc.body.classList.remove('dark-theme')
        doc.body.classList.add('light-theme')
        break;
    case 'dark':
        doc.body.classList.remove('light-theme')
        doc.body.classList.add('dark-theme')
        break;
  }
}

export default chengeTheme