import db from './var/index'
import $platform from '../../client'
import fullSeoUrl from './worker/fullSeoUrl'
import * as config from './config'
import view from './view'
import getElement from 'core-manager'

const name = 'cDemo'

export default getElement(name, view, db, { fullSeoUrl }, $platform, config)



