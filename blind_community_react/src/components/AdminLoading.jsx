import React from 'react'
import PropTypes from 'prop-types'
import HashLoader from 'react-spinners/HashLoader'

const Loading = ({ loading, color, text, css, size }) => {
    return (
        <div
            style={{
                position: `fixed`,
                zIndex: `100`,
                left: 0,
                top: 0,
                overflow: `hidden`,
                width: `100vw`,
                height: `100vh`,
                backgroundColor: `rgba(0,0,0,0.7)`,
                display: loading ? `flex` : `none`,
                flexDirection: `column`,
                alignItems: `center`,
                justifyContent: `center`,
                fontSize: `1.85rem`
            }}
        >
            <HashLoader loading={loading} color={color} css={css} size={size} />
            <h1
                style={{
                    fontWeight: `bold`,
                    paddingTop: `1.5rem`,
                    color: `rgba(255,255,255,0.75)`
                }}
            >
                {text}
            </h1>
        </div>
    )
}

Loading.prototype = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    text: PropTypes.string,
    css: PropTypes.object,
    size: PropTypes.number,
}

Loading.defaultProps = {
    loading: false,
    color: `#FFFFFF`,
    text: `Loading...`,
    css: {},
    size: 80,
}

export default Loading