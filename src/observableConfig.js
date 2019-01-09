import { from, interval } from 'rxjs'
import { setObservableConfig } from 'recompose'

setObservableConfig({
    fromESObservable: from
})