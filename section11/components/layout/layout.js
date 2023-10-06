const { Fragment } = require("react");
import MainNavigation from '@/components/layout/main-navigation';

function Layout(props) {
    return <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
    </Fragment>
}
export default Layout;