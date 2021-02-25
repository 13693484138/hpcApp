// import Vue from 'vue'
import {
    PullRefresh,
    Cell,
    CellGroup,
    NavBar,
    CountDown,
    Radio,
    Uploader,
    PasswordInput,
    NumberKeyboard,
    Tab,
    Tabs,
    Collapse,
    CollapseItem,
    // Sticky,
    // List,
    // Icon,
    Swipe,
    // ImagePreview, //轮播预览
    SwipeItem,
    Lazyload,
    Overlay,
    // Dialog,
    // Button,
    Field,
    Toast,
    Loading,
    Skeleton, //骨架屏
    Popup,
    Dialog,
    Image,
    Sku,
    Step,
    Steps, // sku
} from 'vant'

Vue
    .use(Step)
    .use(Steps)
    .use(Collapse)
    .use(CollapseItem)
    .use(PullRefresh)
    .use(Cell)
    .use(CellGroup)
    .use(NavBar)
    .use(CountDown)
    .use(Uploader)
    .use(PasswordInput)
    .use(NumberKeyboard)
    .use(Radio)
    .use(Radio)
    .use(PasswordInput)
    .use(NumberKeyboard)
    .use(Tab)
    .use(Tabs)
    // .use(Sticky)
    // .use(List)
    // .use(Icon)
    .use(Swipe)
    .use(SwipeItem)
    .use(Lazyload, {
        loading: require('@/images/productDetail/bg.png'),
    })
    .use(Overlay)
    .use(Toast)
    .use(Popup)
    // .use(Button)
    .use(Field)
    // .use(Toast)
    .use(Loading)
    .use(Skeleton)
    .use(Sku)
    .use(Popup)
    .use(Dialog)
    // .use(ImagePreview)
    .use(Image)