import {
  Divider,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';
import { default as React } from 'react';

export default function Welcome() {
  return (
    <VStack align="center" w="940px" gridGap={10}>
      <VStack gridGap={4}>
        <Text fontWeight={400}>
          Welcome to the first ever Decentralized Email Service!
        </Text>
        <LogoIcon fontSize={200} color="#8E54A2" />
      </VStack>
      <Divider />
      <HStack margin={10}>
        <VStack flex={1} height="250px">
          <Heading size="sm" fontWeight={500}>
            Decentralized
          </Heading>
          <Text>
            There is no central server relaying messages. Messages are sent
            Peer-to-Peer with data stored on IPFS.
          </Text>
          <Spacer />
          <svg
            height="100"
            viewBox="0 0 85 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="85" height="84" fill="white" />
            <path
              d="M80.3334 42.0002C80.3334 62.619 63.6187 79.3335 43.0001 79.3335C22.3814 79.3335 5.66675 62.619 5.66675 42.0002C5.66675 21.3814 22.3814 4.66683 43.0001 4.66683C63.6187 4.66683 80.3334 21.3814 80.3334 42.0002Z"
              fill="#CCD1D9"
            />
            <path
              d="M44.3334 31.3335H41.6667V28.6668H44.3334V31.3335Z"
              fill="#FFEAA7"
            />
            <path d="M44.3334 26H41.6667V23.3333H44.3334V26Z" fill="#FFEAA7" />
            <path
              d="M44.3334 20.667H41.6667V18.0003H44.3334V20.667Z"
              fill="#FFEAA7"
            />
            <path
              d="M44.3334 15.3335H41.6667V12.6668H44.3334V15.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M28.3334 43.3335H25.6667V40.6668H28.3334V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M23.0002 43.3335H20.3335V40.6668H23.0002V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M17.6667 43.3335H15V40.6668H17.6667V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M12.3334 43.3335H9.66675V40.6668H12.3334V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M44.3334 55.3335H41.6667V52.6668H44.3334V55.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M44.3334 60.667H41.6667V58.0003H44.3334V60.667Z"
              fill="#FFEAA7"
            />
            <path d="M44.3334 66H41.6667V63.3333H44.3334V66Z" fill="#FFEAA7" />
            <path
              d="M44.3334 71.3335H41.6667V68.6668H44.3334V71.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M60.3334 43.3335H57.6667V40.6668H60.3334V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M65.6667 43.3335H63V40.6668H65.6667V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M27.0002 18V8.264C22.1295 10.5787 17.8429 13.9172 14.4109 18H27.0002Z"
              fill="#AAB2BD"
            />
            <path
              d="M71.0002 43.3335H68.3335V40.6668H71.0002V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M76.3334 43.3335H73.6667V40.6668H76.3334V43.3335Z"
              fill="#FFEAA7"
            />
            <path
              d="M59 8.264V18H71.5893C68.1573 13.9172 63.8707 10.5787 59 8.264Z"
              fill="#AAB2BD"
            />
            <path
              d="M59 75.7363C63.8707 73.4217 68.1573 70.0842 71.5893 66.0003H59V75.7363Z"
              fill="#AAB2BD"
            />
            <path
              d="M27.0002 75.7363V66.0003H14.4109C17.8429 70.0842 22.1295 73.4217 27.0002 75.7363Z"
              fill="#AAB2BD"
            />
            <path
              d="M29.6667 51.3335V32.6668H56.3334V51.3335H29.6667Z"
              fill="#AAB2BD"
            />
            <path
              d="M32.4374 38.5176L21.7708 13.1842L24.2294 12.1498L34.8961 37.4832L32.4374 38.5176Z"
              fill="#656D78"
            />
            <path
              d="M24.2294 12.1495L21.7708 13.1839L23.8001 18H26.6934L24.2294 12.1495Z"
              fill="#434A54"
            />
            <path
              d="M24.2294 12.1495L21.7708 13.1839L23.8001 18H26.6934L24.2294 12.1495Z"
              fill="#434A54"
            />
            <path
              d="M32.4374 38.5176L34.896 37.4832L32.8667 32.667H29.9734L32.4374 38.5176Z"
              fill="#434A54"
            />
            <path
              d="M24.2294 71.8506L21.7708 70.8162L32.4374 45.4828L34.8961 46.5173L24.2294 71.8506Z"
              fill="#656D78"
            />
            <path
              d="M23.8001 66L21.7708 70.8162L24.2294 71.8506L26.6934 66H23.8001Z"
              fill="#434A54"
            />
            <path
              d="M23.8001 66L21.7708 70.8162L24.2294 71.8506L26.6934 66H23.8001Z"
              fill="#434A54"
            />
            <path
              d="M29.9734 51.3335H32.8667L34.896 46.5174L32.4374 45.483L29.9734 51.3335Z"
              fill="#434A54"
            />
            <path
              d="M61.7614 73.1616L51.0947 46.495L53.5721 45.5054L64.2387 72.172L61.7614 73.1616Z"
              fill="#656D78"
            />
            <path
              d="M59 66.2575L61.7613 73.1616L64.2387 72.172L61.7693 66.0002H59V66.2575Z"
              fill="#434A54"
            />
            <path
              d="M53.5721 45.5054L51.0947 46.495L53.0294 51.3335H55.9027L53.5721 45.5054"
              fill="#434A54"
            />
            <path
              d="M24.3333 15.3335H3V2.00016H24.3333V15.3335Z"
              fill="#69D6F4"
            />
            <path
              d="M24.3335 15.3335H16.3335V2.00016H24.3335V15.3335Z"
              fill="#4FC1E9"
            />
            <path
              d="M53.5721 38.4951L51.0947 37.5055L61.7614 10.8389L64.2387 11.8285L53.5721 38.4951Z"
              fill="#656D78"
            />
            <path
              d="M61.7613 10.8385L59 17.7427V18H61.7693L64.2387 11.8281L61.7613 10.8385Z"
              fill="#434A54"
            />
            <path
              d="M53.0294 32.667L51.0947 37.5055L53.5721 38.4951L55.9027 32.667H53.0294"
              fill="#434A54"
            />
            <path
              d="M53.6668 48.667H32.3335V35.3337H53.6668V48.667Z"
              fill="#69D6F4"
            />
            <path
              d="M53.6667 48.667H45.6667V35.3337H53.6667V48.667Z"
              fill="#4FC1E9"
            />
            <path d="M24.3333 82H3V68.6667H24.3333V82Z" fill="#69D6F4" />
            <path d="M24.3335 82H16.3335V68.6667H24.3335V82Z" fill="#4FC1E9" />
            <path
              d="M83.0001 15.3335H61.6667V2.00016H83.0001V15.3335Z"
              fill="#69D6F4"
            />
            <path d="M83 15.3335H75V2.00016H83V15.3335Z" fill="#4FC1E9" />
            <path d="M83.0001 82H61.6667V68.6667H83.0001V82Z" fill="#69D6F4" />
            <path d="M83 82H75V68.6667H83V82Z" fill="#4FC1E9" />
          </svg>
        </VStack>
        <VStack flex={1} height="250px">
          <Heading size="sm" fontWeight={500}>
            Trustless
          </Heading>
          <Text>
            Our identity system is built on Decentralized Identifiers (DID's)
            https://w3c.github.io/did-core/. You own your own idenity, not an
            Identity Provider.
          </Text>
          <Spacer />
          <svg
            height="100"
            viewBox="0 0 740 334"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M393.989 124.696C393.989 124.696 395.195 123.299 397.532 120.591C399.874 117.884 403.292 113.815 408.004 108.79C410.332 106.236 412.947 103.395 415.896 100.395C418.833 97.3675 422.034 94.0412 425.61 90.6362C427.388 88.9099 429.233 87.1199 431.143 85.2662C433.069 83.4374 435.097 81.6074 437.184 79.6987C441.335 75.8374 445.895 72.0025 450.705 67.895C470.057 51.7787 494.809 33.79 525.938 19.5575C527.884 18.6737 529.848 17.7812 531.827 16.8825C533.82 16.03 535.854 15.2549 537.899 14.4512C539.948 13.6549 542.013 12.8537 544.093 12.0462C546.189 11.29 548.325 10.6325 550.466 9.91372C552.614 9.20872 554.777 8.49871 556.956 7.78371C559.163 7.18996 561.385 6.59245 563.623 5.98995C564.745 5.6912 565.87 5.39124 566.999 5.08999L568.696 4.63869L569.547 4.41122L570.68 4.18624C572.866 3.73249 575.067 3.27618 577.281 2.81618C579.802 2.46118 582.339 2.10373 584.892 1.74373C587.406 1.45873 589.854 1.32121 592.369 1.12746C597.376 0.894963 602.462 0.86999 607.61 1.18624C617.901 1.80374 628.438 3.59748 639.037 6.80373C649.64 9.98623 660.279 14.7062 670.673 21.1237C681.041 27.595 691.161 35.8287 700.451 46.1212C705.133 51.205 709.48 56.9787 713.605 63.1112C714.605 64.68 715.566 66.3012 716.546 67.9074C717.505 69.5362 718.542 71.0975 719.404 72.8337C721.174 76.2562 723.065 79.6137 724.602 83.2787C731.083 97.6475 735.862 113.824 737.974 130.649C740.208 147.459 740.052 164.729 738.041 181.427L737.677 184.572L737.585 185.36C737.479 186.059 737.695 184.91 737.322 187.125L737.1 188.455L736.211 193.786L735.766 196.457L735.655 197.126L735.467 197.98L735.083 199.702C734.55 201.997 734.018 204.297 733.486 206.6C733.208 207.736 732.944 208.929 732.646 210.019L731.709 213.16L729.799 219.451C729.193 221.565 728.326 223.575 727.587 225.642C726.811 227.694 726.052 229.76 725.236 231.799C718.451 247.98 709.028 262.921 697.679 275.132C686.363 287.434 673.182 296.744 659.456 303.509C656.036 305.337 652.523 306.602 649.022 308.074C647.274 308.84 645.501 309.361 643.731 309.956L638.405 311.684C635.174 312.54 631.937 313.397 628.693 314.256L626.393 314.852L623.75 315.387L618.447 316.441C616.693 316.769 614.87 317.181 613.165 317.427L608.042 318.161L602.908 318.889C601.194 319.122 599.471 319.224 597.751 319.395C590.867 320.124 583.945 320.366 577.004 320.484C563.119 320.631 549.192 319.356 535.374 317.051C521.556 314.697 507.877 311.1 494.418 306.61C467.496 297.586 441.502 284.832 416.83 269.362C392.111 253.972 368.577 236.117 346.145 216.794C334.933 207.115 323.995 197.055 313.28 186.754C310.596 184.184 307.925 181.6 305.289 178.976L297.468 171.195C292.4 166.12 287.335 161.05 282.276 155.985C262.114 136.022 242.382 116.975 221.965 101.341C211.774 93.51 201.446 86.5149 190.961 80.5737C188.333 79.1474 185.735 77.5749 183.091 76.2512C180.689 75.0549 178.291 73.8612 175.894 72.6674L171.373 70.7725L169.115 69.8275C168.768 69.6912 168.295 69.4612 168.052 69.4037L167.23 69.155L163.949 68.1062C162.85 67.7475 161.833 67.3274 160.493 67.0687C140.362 61.6374 118.996 63.2587 100.382 71.255C91.073 75.28 82.468 80.9674 74.974 88.1049L72.231 90.87C71.319 91.7937 70.351 92.6499 69.559 93.7199L67.042 96.7575L65.773 98.2612L65.454 98.6362C65.563 98.4549 64.76 99.5712 65.617 98.325L64.875 99.3762L61.893 103.554C61.303 104.346 61.148 104.69 60.819 105.2L59.919 106.626L58.997 108.035C58.682 108.531 58.352 109.185 58.028 109.75L56.063 113.259C53.625 118.086 51.438 123.119 49.618 128.39C47.896 133.707 46.333 139.142 45.29 144.79C44.253 150.427 43.396 156.157 43.075 161.977L42.909 164.151L42.843 166.339L42.688 170.71C42.732 173.631 42.64 176.552 42.835 179.469C43.266 191.15 45.142 202.689 48 213.656C50.945 224.586 54.969 234.915 59.857 244.271C64.797 253.569 70.526 262.035 77.08 268.982L79.535 271.582C80.36 272.434 81.237 273.186 82.082 273.999L84.13 275.931C85.2 276.77 86.265 277.605 87.329 278.439C88.392 279.274 89.453 280.106 90.51 280.935L91.303 281.557L91.698 281.866L92.022 282.065L93.312 282.874C95.024 283.969 96.723 285.095 98.417 286.255C106.139 290.596 114.208 293.881 122.433 296.129C124.502 296.621 126.586 297.014 128.651 297.469C129.686 297.677 130.712 297.939 131.75 298.109C132.796 298.239 133.838 298.369 134.877 298.5C136.961 298.741 139.025 299.077 141.102 299.255C143.188 299.375 145.262 299.494 147.322 299.612C149.383 299.802 151.451 299.7 153.505 299.679C155.56 299.621 157.606 299.686 159.641 299.536C163.708 299.146 167.751 299.02 171.718 298.316C173.708 298.025 175.684 297.734 177.646 297.446C179.601 297.042 181.542 296.641 183.469 296.244C187.345 295.551 191.103 294.407 194.849 293.497C209.795 289.406 223.325 283.366 235.811 276.881C248.213 270.35 259.445 263.159 269.62 256.666C289.888 243.394 306.025 232.781 317.297 226.421C320.091 224.77 322.602 223.411 324.768 222.249C326.923 221.061 328.76 220.124 330.244 219.382C333.198 217.886 334.723 217.114 334.723 217.114C334.723 217.114 333.329 218.204 330.625 220.314C329.273 221.359 327.601 222.671 325.648 224.302C323.691 225.922 321.405 227.742 318.869 229.915C313.76 234.175 307.583 239.656 300.332 246.117C293.097 252.622 284.827 260.191 275.375 268.516C265.922 276.859 255.285 285.889 242.953 294.84C239.814 297.061 236.551 299.404 233.414 301.434C232.617 301.959 231.815 302.485 231.01 303.015L230.406 303.411L230.103 303.609L229.667 303.874L228.38 304.64C226.659 305.666 224.921 306.702 223.168 307.747C221.422 308.826 219.623 309.797 217.797 310.755C215.973 311.727 214.133 312.709 212.278 313.697C208.52 315.53 204.682 317.387 200.731 319.121C198.739 319.941 196.732 320.766 194.708 321.599C192.692 322.474 190.623 323.21 188.524 323.905C186.427 324.621 184.314 325.342 182.185 326.067C180.026 326.676 177.85 327.29 175.659 327.906C171.29 329.251 166.739 330.026 162.152 331.047C159.852 331.515 157.5 331.766 155.146 332.135C152.787 332.466 150.416 332.875 147.992 332.985C145.572 333.159 143.135 333.335 140.684 333.511C138.224 333.636 135.73 333.509 133.224 333.509C131.969 333.492 130.709 333.475 129.448 333.459C128.183 333.399 126.912 333.244 125.635 333.136C123.084 332.885 120.512 332.684 117.923 332.365C107.569 330.791 96.961 327.875 86.347 323.28C83.573 321.875 80.781 320.422 77.979 318.926L75.879 317.79L75.354 317.5L74.937 317.23L74.107 316.69C73 315.967 71.889 315.244 70.776 314.517C69.663 313.792 68.546 313.065 67.428 312.336L67.008 312.062C66.574 311.747 67.389 312.381 65.926 311.287L64.996 310.56L63.129 309.097C61.892 308.106 60.62 307.161 59.404 306.112C58.201 305.041 56.994 303.967 55.785 302.89C46.132 294.2 37.488 283.442 29.903 271.386C14.876 247.124 4.668 217.036 1.462 184.276C0.988 180.194 0.829996 176.041 0.570996 171.882C0.499996 169.797 0.473999 167.702 0.435999 165.604L0.401001 162.451L0.480005 159.287C0.588005 150.84 1.393 142.306 2.579 133.776C3.77 125.234 5.693 116.752 8.014 108.357C10.436 99.9924 13.474 91.8099 17.022 83.8812C17.945 81.9262 18.911 79.9962 19.868 78.0537C20.363 77.075 20.797 76.1362 21.348 75.125L23.079 72.0562L24.835 68.9987C25.404 68.0262 26.086 66.8237 26.491 66.2262L29.283 61.8474L29.988 60.7562C31.097 59.1662 30.563 59.9562 30.932 59.44L31.4 58.815L33.281 56.3175L37.076 51.335C38.311 49.6225 39.717 48.1525 41.084 46.6187L45.228 42.055C56.522 30.2312 69.431 20.8074 83.115 14.0112C110.538 0.349941 140.884 -2.87006 170.395 3.75619C172.19 4.06119 174.23 4.68493 176.209 5.25118L182.167 7.01748L183.656 7.47372C184.188 7.62872 184.458 7.76246 184.872 7.90871L187.152 8.7662L191.719 10.4837L192.29 10.6975C192.866 10.9325 191.809 10.475 193.724 11.2787L194.967 11.8425L197.452 12.9687L202.427 15.2362C205.743 16.7587 208.956 18.5175 212.231 20.1612C225.161 27.1075 237.59 35.1937 249.522 43.9737C273.387 61.5825 295.31 81.7687 316.167 102.182C321.339 107.261 326.517 112.345 331.698 117.432L339.278 124.865C341.767 127.329 344.281 129.744 346.802 132.141C356.871 141.77 367.098 151.074 377.466 160.014C398.167 177.962 419.564 194.214 441.474 208.269C452.448 215.245 463.54 221.686 474.745 227.445C485.958 233.175 497.304 238.117 508.718 242.232C520.131 246.357 531.625 249.559 543.108 251.922C554.587 254.296 566.083 255.811 577.501 256.127C583.208 256.24 588.903 256.282 594.56 255.896C595.974 255.809 597.394 255.796 598.802 255.654L603.025 255.214L607.244 254.785C608.649 254.644 609.906 254.382 611.245 254.194L615.203 253.59L617.182 253.296L619.469 252.827C622.335 252.236 625.196 251.645 628.05 251.055L631.748 250.055C632.977 249.716 634.234 249.454 635.411 248.98C637.784 248.09 640.25 247.427 642.514 246.31C651.769 242.317 660.335 236.884 667.516 229.731C674.689 222.579 680.743 214.109 685.455 204.435L687.078 200.694C687.591 199.425 688.238 198.252 688.662 196.916L690.053 192.995L690.764 191.04C690.97 190.412 691.104 189.842 691.284 189.244L692.34 185.704L692.618 184.821L692.757 184.371L692.899 183.712L693.461 181.075L694.585 175.814L694.866 174.501C694.554 176.269 694.829 174.674 694.782 174.926L694.868 174.374L695.215 172.17C697.164 160.411 697.759 148.827 696.979 137.714C696.244 126.571 693.726 116.026 690.034 106.209C689.195 103.697 688.018 101.399 686.995 99.0037C686.509 97.7849 685.84 96.6974 685.262 95.5449L683.473 92.125C680.856 87.7587 678.195 83.395 675.085 79.4787C668.993 71.5275 661.935 64.6237 654.336 58.8775C646.714 53.1575 638.563 48.64 630.268 45.0537C621.96 41.5012 613.461 39.0275 605.012 37.5412C600.786 36.79 596.571 36.3299 592.39 36.0374C590.304 35.9549 588.232 35.8724 586.171 35.7899C584.196 35.7999 582.233 35.8087 580.282 35.8187C563.172 36.9487 547.159 40.4512 532.105 44.9287C517.072 49.4225 503.218 55.2287 490.521 61.1649C477.825 67.1449 466.46 73.7487 456.207 79.8387C451.129 83.0049 446.289 85.9637 441.848 89.02C439.617 90.5225 437.418 91.9137 435.335 93.3499C433.26 94.8087 431.256 96.2162 429.325 97.5737C425.428 100.24 421.932 102.931 418.682 105.321C415.412 107.682 412.508 109.941 409.912 111.982C404.687 116.005 400.708 119.232 398.042 121.411C395.369 123.577 393.989 124.696 393.989 124.696"
              fill="black"
            />
          </svg>
        </VStack>
        <VStack flex={1} height="250px">
          <Heading size="sm" fontWeight={500}>
            Easy to Use!
          </Heading>
          <Text>
            You can send and receive emails using our web3 ui or with a lecgay
            email client with our local SMTP and IMAP proxy. Easily contact
            anyone using ENS identifiers.
          </Text>
          <Spacer />

          <svg
            height="100"
            viewBox="0 0 284 146"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="284" height="146" fill="white" />
            <path
              d="M191.571 105.055L252.577 60.732C235.969 37.9134 212.4 20.4934 184.985 11.592L161.683 83.308C173.796 87.2534 184.22 94.964 191.571 105.055Z"
              fill="#FEAF00"
            />
            <path
              d="M203.025 140.199H278.397C278.397 110.498 268.813 83.039 252.577 60.7323L191.571 105.055C198.767 114.93 203.025 127.075 203.025 140.199"
              fill="#FE2A00"
            />
            <path
              d="M143.199 80.3721C149.649 80.3721 155.857 81.4121 161.683 83.3081L184.985 11.5921C171.825 7.31876 157.783 5.0001 143.199 5.0001C128.612 5.0001 114.572 7.31876 101.411 11.5921L124.713 83.3081C130.539 81.4121 136.748 80.3721 143.199 80.3721"
              fill="#FEF000"
            />
            <path
              d="M94.8267 105.055L33.82 60.7323C17.584 83.039 8 110.498 8 140.199H83.372C83.372 127.075 87.6307 114.93 94.8267 105.055"
              fill="#1EA614"
            />
            <path
              d="M124.713 83.308L101.411 11.592C73.9972 20.4934 50.4265 37.9134 33.8198 60.732L94.8265 105.055C102.177 94.964 112.6 87.2547 124.713 83.308"
              fill="#9FCC00"
            />
            <path
              d="M138.884 138.627C132.886 138.141 128.416 132.884 128.903 126.883C129.389 120.884 134.647 116.416 140.644 116.902C146.645 117.388 151.113 122.645 150.627 128.644C150.141 134.644 144.884 139.113 138.884 138.627"
              fill="#101012"
            />
            <path
              d="M130.215 133.017L79.1068 125.111C79.1161 124.897 79.1267 124.684 79.1388 124.468L129.86 132.313C129.971 132.552 130.088 132.786 130.215 133.017Z"
              fill="#B2B2B2"
            />
            <path
              d="M138.388 133.732L138.344 134.274L130.215 133.017C130.088 132.786 129.971 132.552 129.86 132.313L137.678 133.523C137.907 133.606 138.145 133.676 138.388 133.732Z"
              fill="#0B0B0D"
            />
            <path
              d="M65.0633 121.137L140.251 121.758L139.277 133.771L64.9708 122.278C64.268 122.169 64.3522 121.13 65.0633 121.137"
              fill="#101012"
            />
            <path
              d="M145.871 128.258C145.598 131.624 142.639 134.141 139.269 133.868C135.904 133.596 133.387 130.635 133.66 127.269C133.933 123.902 136.894 121.385 140.259 121.658C143.628 121.931 146.143 124.892 145.871 128.258Z"
              fill="#1B1B1F"
            />
            <path
              d="M140.602 116.898C140.597 116.898 140.595 116.898 140.591 116.898C140.594 116.898 140.597 116.898 140.602 116.898ZM140.556 116.896C140.554 116.896 140.549 116.895 140.545 116.895C140.549 116.895 140.554 116.896 140.556 116.896ZM140.502 116.892L140.5 116.891L140.502 116.892ZM140.459 116.888C140.455 116.888 140.451 116.889 140.447 116.888C140.451 116.889 140.455 116.888 140.459 116.888ZM140.412 116.886C140.41 116.885 140.407 116.885 140.404 116.885C140.407 116.885 140.41 116.885 140.412 116.886ZM140.359 116.883C140.359 116.883 140.359 116.883 140.358 116.883L140.359 116.883ZM140.315 116.88C140.312 116.88 140.311 116.88 140.309 116.88C140.31 116.88 140.312 116.88 140.315 116.88ZM130.722 121.677C130.722 121.679 130.722 121.679 130.722 121.679L79.399 121.255L130.722 121.677"
              fill="#A3A3A3"
            />
            <path
              d="M150.627 128.644L145.871 128.258C146.143 124.892 143.628 121.931 140.259 121.658C139.702 121.613 139.155 121.645 138.63 121.744L130.722 121.678C130.722 121.678 130.722 121.678 130.722 121.677L130.73 121.678C132.794 118.621 136.35 116.695 140.265 116.878C140.279 116.879 140.294 116.879 140.309 116.88C140.312 116.88 140.313 116.88 140.316 116.88C140.33 116.881 140.343 116.881 140.359 116.882C140.36 116.883 140.36 116.883 140.36 116.883C140.376 116.884 140.39 116.884 140.405 116.885C140.407 116.885 140.41 116.885 140.413 116.885C140.423 116.886 140.435 116.887 140.447 116.888C140.452 116.889 140.455 116.888 140.459 116.888C140.474 116.889 140.487 116.89 140.5 116.891L140.502 116.891C140.516 116.893 140.531 116.894 140.546 116.895C140.55 116.895 140.554 116.896 140.556 116.896C140.569 116.895 140.579 116.896 140.591 116.897C140.595 116.898 140.598 116.898 140.602 116.898C140.616 116.899 140.631 116.9 140.644 116.902C146.645 117.388 151.113 122.645 150.627 128.644"
              fill="#0A0A0C"
            />
            <path
              d="M143.58 65.7002C143.48 65.6135 143.351 65.5695 143.219 65.5642C143.351 65.5682 143.48 65.6135 143.58 65.7002Z"
              fill="#A29900"
            />
            <path
              d="M138.63 121.744C135.987 122.243 133.888 124.461 133.66 127.269L128.902 126.883L64.4869 121.663C64.4875 121.657 64.488 121.65 64.4885 121.643C64.5045 121.512 64.5588 121.387 64.6533 121.294C64.7494 121.198 64.8882 121.135 65.0634 121.136L79.3993 121.255L130.722 121.678L138.63 121.744Z"
              fill="#0A0A0C"
            />
            <path
              d="M145.871 128.258L133.66 127.268C133.888 124.46 135.987 122.243 138.63 121.744C139.155 121.644 139.702 121.612 140.259 121.658C143.628 121.931 146.143 124.892 145.871 128.258"
              fill="#111114"
            />
          </svg>
        </VStack>
      </HStack>
      <Divider />
      <VStack>
        <Text fontWeight={500}>Made possible by</Text>
        <Image
          src="/technology.png"
          alt="ceramic, orbitdb, ens, ipfs, ethereum"
        />
      </VStack>
    </VStack>
  );
}
