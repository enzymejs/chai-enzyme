const magicToStringObject = {
  toString () {
    return 'magic'
  }
}

class Fixture extends React.Component {
  render () {
    /* eslint-disable react/jsx-boolean-value */
    return (
      <div id='root'>
        <span id='child'>test</span>
        <video itemScope allowFullScreen={true} autoPlay={''} hidden={false} controls={null} loop={undefined}>test2</video>
        <audio role name={''} accessKey={false} spellCheck={null} rel={magicToStringObject}>test3</audio>
        <tr rowSpan={0} rows={0} cols={'4'} size={'0'}></tr>
      </div>
    )
    /* eslint-enable react/jsx-boolean-value */
  }
}

const it = createTest(<Fixture />)

describe('#attr', () => {
  it('fails when the actual is not an enzyme wrapper', () => {
    [undefined, { foo: 'bar' }, [], 'test', 12345].forEach((actual) => {
      expect(() => {
        expect(actual).to.have.attr('key', 'somekey')
      }).to.throw()
    })
  })

  describe('(attr)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('span')).to.have.attr('id')
      expect(wrapper).to.have.attr('id')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.attr('disabled')
      expect(wrapper.find('span')).to.not.have.attr('disabled')
    })

    describe('HAS_NUMERIC_VALUE attrs', () => {
      it('passes when attribute exists without a `0` vaue', (wrapper) => {
        expect(wrapper.find('tr')).to.have.attr('rowspan')
      })
    })

    describe('HAS_POSITIVE_NUMERIC_VALUE attrs', () => {
      it('passes when attribute exists with a string value', (wrapper) => {
        expect(wrapper.find('tr')).to.have.attr('cols')
      })

      it('passes negated when attribute exists but has value `0`', (wrapper) => {
        expect(wrapper.find('tr')).to.not.have.attr('rows')
      })

      it('passes negated when attribute exists but has value `"0"`', (wrapper) => {
        expect(wrapper.find('tr')).to.not.have.attr('size')
      })
    })

    describe('HAS_BOOLEAN_VALUE attrs', () => {
      it('passes when attribute exists without a value', (wrapper) => {
        expect(wrapper.find('video')).to.have.attr('itemscope')
      })

      it('passes negated when attribute exists with a falsey (but not false/null/undefined) value', (wrapper) => {
        expect(wrapper.find('video')).to.not.have.attr('autoplay')
        expect(wrapper.find('video')).to.not.have.attr('autoPlay')
      })

      it('passes negated when attribute exists but has value `false`', (wrapper) => {
        expect(wrapper.find('video')).to.not.have.attr('hidden')
      })

      it('passes negated when attribute exists but has value `null`', (wrapper) => {
        expect(wrapper.find('video')).to.not.have.attr('controls')
      })

      it('passes negated when attribute exists but has value `undefined`', (wrapper) => {
        expect(wrapper.find('video')).to.not.have.attr('loop')
      })
    })

    describe('regular attrs', () => {
      it('passes when attribute exists without a value', (wrapper) => {
        expect(wrapper.find('audio')).to.have.attr('role')
      })

      it('passes when attribute exists with a falsey (but not false/null/undefined) value', (wrapper) => {
        expect(wrapper.find('audio')).to.have.attr('name')
      })

      it('passes when attribute exists but has value `false`', (wrapper) => {
        expect(wrapper.find('audio')).to.have.attr('accesskey')
      })

      it('passes negated when attribute exists but has value `null`', (wrapper) => {
        expect(wrapper.find('audio')).to.not.have.attr('spellcheck')
        expect(wrapper.find('audio')).to.not.have.attr('spellCheck')
      })
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.attr('disabled')
      }).to.throw("to have a 'disabled' attr")

      expect(() => {
        expect(wrapper.find('span')).to.have.attr('disabled')
      }).to.throw("to have a 'disabled' attr")
    })
  })

  describe('(attr, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.attr('id', 'root')
      expect(wrapper.find('span')).to.have.attr('id', 'child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.attr('id', 'invalid')
      expect(wrapper.find('span')).to.not.have.attr('id', 'invalid')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.attr('id', 'invalid')
      }).to.throw("to have a 'id' attr")

      expect(() => {
        expect(wrapper.find('span')).to.have.attr('id', 'invalid')
      }).to.throw("to have a 'id' attr")
    })

    describe('HAS_BOOLEAN_VALUE attrs', () => {
      it('converts values to empty strings', (wrapper) => {
        expect(wrapper.find('video')).to.have.attr('itemscope', '')
        expect(wrapper.find('video')).to.have.attr('allowfullscreen', '')
      })
    })

    describe('regular attrs', () => {
      it('converts values to strings', (wrapper) => {
        expect(wrapper.find('audio')).to.have.attr('accesskey', 'false')
        expect(wrapper.find('audio')).to.have.attr('rel', 'magic')
      })
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper).to.have.attr('id').equal('root')
    expect(wrapper.find('span')).to.have.attr('id').equal('child')
  })
})
