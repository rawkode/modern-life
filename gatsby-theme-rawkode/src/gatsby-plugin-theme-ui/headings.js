const headingBase = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
  mt: 0,
  mb: 3,
  paddingBottom: 1
};

export default {
  h1: {
    ...headingBase,
    fontSize: 5,
    borderBottom: '3px solid'
  },
  h2: {
    ...headingBase,
    fontSize: 4
  },
  h3: {
    ...headingBase,
    fontSize: 3,
    borderBottom: '2px dashed'
  },
  h4: {
    ...headingBase,
    fontSize: 2,
    borderBottom: '1px dashed'
  },
  h5: {
    ...headingBase,
    fontSize: 1
  },
  h6: {
    ...headingBase,
    fontSize: 0
  }
};
