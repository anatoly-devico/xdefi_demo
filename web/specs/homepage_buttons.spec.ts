import Homepage from '../pages/home.page'

describe('Check carousel and installation buttons on homepage', () => {

  beforeEach(async () => {
    await Homepage.open()
  })

  it('should check buttons on carousel of supported blockchains', async () => {
    await Homepage.verifyBlockchainCarouselBtns()
  })

  it('should open Chrome web store after click on "Install XDEFI Wallet" button', async () => {
    await Homepage.checkInstallationBtn()
  })
})
