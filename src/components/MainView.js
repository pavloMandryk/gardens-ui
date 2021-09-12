import React from 'react'
import { GU, Root, ScrollView, ToastHub, useViewport } from '@1hive/1hive-ui'
import Footer from './Garden/Footer'
import Header from './Header/Header'
import Layout from './Layout'
import Sidebar from './Sidebar/Sidebar'
import { useGardens } from '@/providers/Gardens'
import { useGardenState } from '@/providers/GardenState'

function MainView({ children }) {
  const { below } = useViewport()
  const { connectedGarden } = useGardens()

  let loading = true
  if (connectedGarden) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { loading: loadingGardenState } = useGardenState()
    loading = loadingGardenState
  }

  const compactMode = below('large')

  return (
    <ToastHub
      threshold={1}
      timeout={1500}
      css={`
      & > div {
        width: auto;
        & > div {
          rgba(33, 43, 54, 0.9);
          border-radius: 16px;
        }
      }
    `}
    >
      <div css="display: flex">
        {connectedGarden && !below('medium') && <Sidebar />}
        <div
          css={`
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100%;
          `}
        >
          <Root.Provider
            css={`
              flex-grow: 1;
              height: 100%;
              position: relative;
            `}
          >
            <div
              css={`
                flex-shrink: 0;
              `}
            >
              <Header />
            </div>
            <ScrollView>
              <div
                css={`
                  min-height: 100vh;
                  margin: 0;
                  display: grid;
                  grid-template-rows: 1fr auto;
                `}
              >
                <div
                  css={`
                    margin-bottom: ${(compactMode ? 3 : 0) * GU}px;
                  `}
                >
                  <Layout paddingBottom={3 * GU}>{children}</Layout>
                </div>
                {connectedGarden ? !loading && <Footer /> : <Footer />}
              </div>
            </ScrollView>
          </Root.Provider>
        </div>
      </div>
    </ToastHub>
  )
}

export default MainView
