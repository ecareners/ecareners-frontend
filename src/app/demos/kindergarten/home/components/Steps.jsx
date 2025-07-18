import { Button, Col, Container, Row } from 'react-bootstrap';
import childImg from '@/assets/images/element/child.svg';
import ideaImg from '@/assets/images/element/idea.svg';
import helpImg from '@/assets/images/element/help.svg';
const Steps = () => {
  return <section className="position-relative pt-0 pt-lg-5">
      <figure className="position-absolute top-0 start-0 mt-5 ms-1 d-none d-xxl-block">
        <svg enableBackground="new 0 0 84.6 98">
          <path className="fill-success" d="m54.4 73.8c1.1 4.1 2.2 8.2 3.3 12.4 6.2-1.3 12.4-2.4 18.9-2.8 0.3 1.3 0.5 2.7 0.8 4-1.1-0.9-0.9-2.3-1.5-3.4-6.5 0.6-12.9 1.6-19.3 3.2-0.1 0.2-0.1 0.4-0.2 0.6-0.1 0-0.2 0.1-0.3 0.1-0.5-0.5-1.2-0.3-1.7-0.2-3.8 1-7.5 1.9-11.3 2.9-1.7 0.4-3.4 0.9-5.1 1.3 0.3 1.2 0.6 2.4 0.9 3.7-0.9-1-1.3-2.1-1.5-3.4-0.3-0.1-0.5-0.2-1-0.3 0.2-0.2 0.3-0.3 0.5-0.4 2.3-0.6 4.6-1.3 6.9-1.8 3.5-0.9 6.9-1.8 10.4-2.6 0.3-0.1 0.6-0.2 0.8-0.3-0.7-2.1-1.6-4.1-2.2-6.1s-1-4.1-1.6-6.2c-0.2 0-0.5-0.1-0.7-0.1-10.2 1.2-19.5-1.3-27.6-7.6-5.3-4.1-9.1-9.3-11.3-15.7-1.3-3.7-2-7.6-2.1-11.5-0.1-3.3 0.4-6.6 1.3-9.8 1.1-4.1 2.8-8 5.2-11.5 0.2-0.3 0.3-0.5 0.4-0.8-1-1.3-2.1-2.5-3.2-3.9-1.4 1.3-2.5 2.7-3.5 4.2-3.2 4.5-5.1 9.6-5.8 15.1-1 7.5-0.6 14.8 1.7 22 2.1 6.4 5.4 12.1 10.6 16.5 3.8 3.2 8.1 5.6 12.9 7.1 2.8 0.9 5.6 1.5 8.4 1.8 2.4 0.2 4.8 0.2 7.1 0.2 1.9 0 3.9-0.3 5.8-0.5 0.3 0 0.6 0.1 1 0.1v0.3c-1.5 0.2-3.1 0.6-4.6 0.7-2.9 0.1-5.8 0.2-8.8 0-2.2-0.1-4.4-0.6-6.5-1.1-4-0.9-7.8-2.4-11.2-4.6-6-3.7-10.6-8.8-13.5-15.3-1.6-3.6-2.8-7.4-3.4-11.4-0.7-3.7-1-7.2-0.8-10.7 0.3-7.9 2.3-15.2 7.1-21.5 0.9-1.2 1.9-2.3 2.9-3.6-0.8-0.9-1.7-1.8-2.5-2.7l0.2-0.2c1.2 0.4 1.8 1.6 2.8 2.5 1.9-1.6 3.8-3.2 6.5-3.6 0 0.8-0.5 0.7-0.8 0.8-1.9 0.6-3.4 1.8-4.9 3.1-0.1 0.1-0.1 0.2-0.3 0.4 0.9 1.2 1.9 2.5 2.9 3.9 0.4-0.5 0.9-1 1.3-1.5 3.5-4.4 7.7-7.7 12.8-10.1 6.5-3 13.3-3.4 20.2-2.1 0.2 0 0.4 0.2 0.7 0.4-0.4 0.5-0.8 0.3-1.1 0.3-2.7-0.7-5.5-0.8-8.3-0.7-2.7 0.1-5.3 0.6-7.8 1.4-5.1 1.6-9.5 4.4-13.2 8.1-3.2 3.2-5.8 6.9-7.7 11.2-1.5 3.3-2.5 6.8-3 10.4-0.6 3.8-0.4 7.6 0.3 11.3 0.5 3.2 1.6 6.3 3 9.1 2.1 4.1 4.9 7.7 8.4 10.6 4 3.4 8.4 5.8 13.4 7.2 7.6 2.2 15.1 2 22.5-0.7 5.4-2 10.1-5 14.1-9.1 1-1 1.9-2.2 2.8-3.3-1.5 0.6-3 1.4-4.9 0.5 0.7-0.1 1.2-0.2 1.6-0.2 1.7 0 3-0.8 3.9-2.1 2-2.6 2.7-7.2 0.8-10.3-1-1.7-3.1-2.3-5.1-1.4-0.6 0.3-0.9 0.8-0.9 1.5 0 1.4-0.7 2.4-1.6 3.3-0.9 0.8-1.7 1.7-2.6 2.5-0.6 0.5-0.9 1.2-0.9 2-0.1 1 0.2 1.5 1.3 1.6 0.7 0.1 1.4 0 2.1 0.1 1 0.1 1.7 0.7 2.1 1.6 0.1 0.2 0 0.4-0.1 0.6l-0.4-0.2c-0.5-1.2-1.5-1.5-2.7-1.5-0.6 0-1.2 0-1.7-0.2-1-0.3-1.3-0.8-1.3-1.8 0-1.1 0.3-2.1 1.2-2.8 0.8-0.7 1.6-1.5 2.4-2.3 0.9-0.8 1.5-1.7 1.6-2.9 0.1-1.5 0.8-2.1 2.3-2.5 3.1-0.7 4.9 1.2 5.6 3.2s0.8 4.1 0.2 6.1c-0.1 0.3-0.1 0.6-0.2 1.1 5.1-7.5 7.1-21.4 1-32.7-5.8-10.7-14.7-17.1-27-19.3 0.9-0.4 1.5-0.3 2.1-0.2 4.5 0.7 8.5 2.5 12.3 4.9 5.2 3.4 9.5 7.6 12.6 13 2.3 4 3.6 8.4 4.1 13 0.3 3 0.3 6-0.1 9-0.6 4.7-2.2 9.1-4.7 13.1-3.9 6.4-9.2 11.3-15.9 14.5-2.2 1.1-4.5 1.8-6.8 2.6-0.2 0.2-0.5 0.3-0.8 0.4zm-2.4 1.1c0.9 4.2 1.7 8.1 3.9 11.7l1.2-0.3c-1.1-4-2.1-7.9-3.2-11.8-0.8 0.2-1.3 0.3-1.9 0.4z" />
          <path className="fill-success" d="m43.6 15.3c0.7 0 1.1 0 1.5-0.1 2.4-0.6 4.8-1.3 7.3-2 3.6-1 7.4-1.5 11.1-1.3 0.6 0 1.3 0.2 1.9 0.5 0.9 0.4 1.3 1.1 1.2 2 0 0.8-0.6 1-1.3 1.3-0.5 0.2-0.9 0.6-1.3 1-0.5 0.6-1 1.2-1.5 1.9-0.9 1.2-1.3 2.4-0.8 4 0.6 1.9-0.1 3.2-2 4-0.8 0.3-1.7 0.5-2.5 0.8-0.6 0.2-1.2 0.5-1.8 0.8s-0.8 0.9-0.7 1.5c0 0.6 0.4 0.9 1 1.1 0.4 0.1 0.8 0.2 1.1 0.3 2.4 0.6 3.9 2.7 3.6 5.1-0.1 1.1-0.4 2.3-0.8 3.3-0.4 1.1-0.3 1.9 0.5 2.7 0.5 0.5 1.1 1 1.6 1.5 0.4 0.4 0.9 0.8 1.3 1.3 0.2 0.3 0.4 0.7 0.4 1.1 0.1 1.1-0.7 1.6-1.6 1-0.6-0.4-1.1-0.9-1.6-1.4-1.1-1.1-2.2-2.3-3.4-3.3-1.4-1.2-3-1.7-4.9-1.8-1.6 0-3.2-0.1-4.8-0.3-2.5-0.3-4.5-1.4-6.1-3.4-1.1-1.5-2.5-2.7-4.3-3.4-1.6-0.5-3.2-0.8-4.8-0.5-3 0.4-6 0.9-9 1.3h-0.9c-1.4-0.1-2.2-0.7-2.5-1.8s0.2-2.4 1.2-3c0.7-0.4 1.5-0.7 2.2-1.1s1.5-0.7 2.1-1.1c1-0.7 1.3-1.8 1-2.8-0.2-0.7-0.6-0.9-1.2-0.6s-1.2 0.8-1.8 1.1c-0.7 0.4-1.3 0.7-2 1-0.9 0.3-1.6-0.2-1.7-1.1 0-0.6 0.1-1.2 0.4-1.8 1.1-2.1 2.7-3.6 4.9-4.6 1.2-0.6 2.5-0.7 3.7-0.2 3 1.2 5.4 0.3 7.5-1.9 1.5-1.5 3.1-2.9 4.8-4.2 0.7-0.5 1.7-0.7 2.6-0.8 1.4-0.1 1.8 0.5 1.2 1.8-0.1 0.6-0.4 1.2-0.8 2.1zm19.1 31.5c0.3-1.1-0.3-1.6-0.9-2.1-0.7-0.6-1.4-1.2-2.1-1.9-1.1-1-1.5-2.2-0.9-3.7 0.4-1 0.7-2.1 0.8-3.2 0.2-2.2-1.1-3.8-3.3-4.3-0.6-0.1-1.2-0.4-1.7-0.6-0.6-0.3-0.8-0.9-0.8-1.6 0.1-0.9 0.4-1.6 1.3-2 0.7-0.3 1.4-0.6 2.1-0.8 0.9-0.3 1.8-0.6 2.6-1 1.2-0.6 1.5-1.3 1.2-2.6-0.2-1.1-0.5-2.2 0-3.3 1.1-1.9 2-3.9 4.2-4.9 0.7-0.3 0.8-0.8 0.4-1.4s-1.1-0.9-1.8-0.9c-1.6 0-3.3-0.1-4.9 0.1-3.2 0.3-6.3 1.2-9.4 2-1.5 0.4-3.1 0.9-4.6 1.3-0.6 0.1-1.2 0.2-1.6-0.3-0.5-0.5-0.2-1.1 0-1.6 0.2-0.6 0.5-1.1 0.8-2-0.9 0.1-1.5 0.1-2.1 0.2-1.1 0.2-1.9 0.9-2.7 1.6-1.4 1.3-2.7 2.6-4 3.8-1.7 1.6-3.7 2.3-6.1 1.5-0.4-0.1-0.8-0.3-1.3-0.3-0.8-0.1-1.6-0.2-2.4 0-2.4 0.7-4.2 2.3-5.4 4.6-0.3 0.6-0.4 1.3 0.1 2.2 0.6-0.3 1.2-0.5 1.8-0.8 0.8-0.5 1.6-1 2.4-1.4 1.1-0.5 1.8-0.2 2.1 1s0.2 2.4-0.9 3.3c-0.6 0.5-1.3 1.1-2 1.2-1 0.2-1.7 0.9-2.6 1.3-0.8 0.4-1.3 1.6-1.1 2.4s1 1.3 2.1 1.3h0.5c1.5-0.2 3-0.5 4.4-0.7 1.9-0.3 3.8-0.6 5.7-0.7 2.1-0.1 4.1 0.3 5.9 1.5 1.2 0.8 2.2 1.9 3.1 3 1.3 1.6 3 2.5 5 2.7 1.3 0.2 2.6 0.4 4 0.3 3.5-0.1 6.2 1.2 8.5 3.9 0.7 0.8 1.4 1.5 2.1 2.2 0.6 0.2 1 0.4 1.5 0.7z" />
          <path className="fill-success" d="m25.1 38.7c1.3-0.9 2.8-1 4.2-0.6 0.5 0.1 1 0.3 1.5 0.5 1 0.4 2.1 0.3 3.1 0.1 0.7-0.1 1.5-0.3 2.2-0.4 1.6-0.2 2.7 0.5 3.4 1.8 0.5 1.1 1 2.2 1.5 3.2 0.2 0.5 0.5 1 0.8 1.5 0.6 0.9 1.4 1.4 2.5 1 0.9-0.2 1.6 0.1 2.1 0.8s0.4 1.5 0.1 2.1c-0.5 0.8-1.1 1.6-1.6 2.4-0.3 0.4-0.5 0.7-0.8 1-0.9 1-1.2 2.2-1 3.6 0.1 0.6 0.1 1.2 0 1.8-0.1 0.8-0.4 1.5-1.1 2-0.8 0.6-1.1 1.4-1.1 2.3l-0.3 2.1c-0.2 1.3-1.1 2-2.4 2.1-1.7 0.1-3.1-0.7-4.2-1.9-1.5-1.7-2.2-3.7-2.8-5.8-0.4-1.3-0.7-2.6-1.1-3.8-0.7-2-1.9-2.7-4-2.6-0.8 0-1.6 0.1-2.4 0.1-3.5 0.1-5.8-3.5-5.3-6.6 0.1-0.6 0.5-1.2 0.8-1.7 0.8-1.1 1.5-2.2 1.9-3.5 0.2-0.8 0.8-1.1 1.6-1.2 0.1 0 0.3 0.1 0.8 0.2-1.5 0.5-1.8 1.5-2.2 2.6-0.3 0.7-0.8 1.4-1.3 2-1.2 1.5-1.2 3.1-0.4 4.7 0.7 1.6 2 2.6 3.8 2.8 0.7 0.1 1.3 0 2 0 0.5 0 1-0.1 1.5-0.1 2.1 0.1 3.4 1 4.1 3 0.6 1.7 1 3.5 1.6 5.2 0.6 1.8 1.3 3.5 2.8 4.7 0.9 0.8 2 1.2 3.2 1.1 1-0.1 1.5-0.5 1.7-1.4 0.1-0.3 0.1-0.7 0.2-1 0.1-1.7 0.6-3.1 1.9-4.3 0.4-0.4 0.4-1.3 0.6-2 0.1-0.3-0.1-0.6-0.1-0.9-0.2-1.5 0-2.8 1.1-3.9 0.8-0.8 1.4-1.8 2-2.8 0.2-0.4 0.4-0.8 0.5-1.2 0.1-0.8-0.4-1.3-1.2-1.3h-0.3c-2 0.1-2.9-0.3-3.8-2.1l-1.5-3.3c-0.9-1.9-1.7-2.4-3.7-2.1-0.4 0.1-0.8 0.1-1.2 0.2-1.4 0.4-2.7 0.4-4-0.1-1.4-0.5-2.8-0.7-4.3-0.4-0.7 0.2-1.1 0.1-1.4 0.1z" />
          <path className="fill-success" d="m40.6 96.6c0 0.3-0.1 0.6-0.1 1.2-0.4-1.5-1.5-0.8-2.2-1v-0.3c0.4-0.2 0.7-0.4 1.2-0.6 0.1-1.1-0.5-2.3 0-3.7 0.8 1.2 0.1 2.6 1.1 3.6 2-0.4 4-0.9 6.1-1.3 2.1-0.5 4.2-0.9 6.3-1.4s4.1-1 6.2-1.5 4.1-0.9 6.2-1.4 4.2-1 6.3-1.4c2-0.4 4-1.1 6.1-0.9-3 1-6.1 1.5-9.2 2.2s-6.3 1.4-9.4 2.2l-9.3 2.1c-3.1 0.8-6.2 1.5-9.3 2.2z" />
          <path className="fill-success" d="m66.5 74.2c2-1.3 3.9-2.6 5.9-3.9-0.5 1-0.9 1.4-2.6 2.5-1 0.6-2 1.3-3 2 0.5 0.9 1 1.8 1.5 2.8-1 0-1-0.7-1.3-1-0.3-0.4-0.6-0.9-1-1.3-3.1 1.5-6.2 3-9.7 3.8 0.1-0.8 0.7-0.8 1.1-0.9 2.1-0.9 4.3-1.7 6.4-2.6 0.6-0.2 1.1-0.6 1.7-0.9-0.6-1-1.2-2-1.7-2.9 1.3 0.3 1.7 1.4 2.7 2.4z" />
          <path className="fill-success" d="m69.8 38.3c0.9 0 1.7 0.3 2.4 0.8 0.6 0.4 0.9 1 0.9 1.7 0 0.3-0.4 0.8-0.7 0.9-1.3 0.5-2.7 0.8-4.1 0.3-0.4-0.1-0.7-0.3-1-0.6-0.8-0.9-0.7-1.8 0.3-2.4 0.7-0.3 1.5-0.4 2.2-0.7zm2.9 2.7c-0.7-1.8-2.5-2.4-4.3-1.6-0.5 0.2-1 0.4-0.9 1 0.1 0.4 0.5 0.8 0.9 1 0.3 0.2 0.7 0.2 1 0.2 1.1 0.1 2.2-0.1 3.3-0.6z" />
          <path className="fill-success" d="m16.5 27.4c-0.3 0.1-0.6 0.2-0.9 0.4-0.5 0.4-1 0.7-1.4 1.1-0.5 0.6-0.3 1.5 0.2 1.8 0.7 0.4 1.7 0 1.9-0.8 0.1-0.4 0.2-0.8 0.3-1.3 0.5 0.9 0.4 1.5 0 2.2-0.5 0.7-1.3 0.9-2.1 0.7-0.6-0.2-1.1-0.8-1.2-1.6-0.1-1.5 1.6-3.1 3.2-2.5z" />
        </svg>
      </figure>
      <figure className="position-absolute top-50 start-0 translate-middle-y ms-5 d-none d-md-block">
        <svg enableBackground="new 0 0 44.1 76.2">
          <path className="fill-orange" d="m25 32c-0.7-0.4-1.4-1-1.1-1.8 0.3-0.9 0.7-1.9 1.8-2.2 1-0.3 2-0.6 3-0.6 1.8-0.1 3.7-0.7 5.5-0.1 0.2 0.1 0.5-0.1 0.8-0.1 0.7 0 1.4 0 2 0.1 1.5 0.4 2 2 0.9 3-0.5 0.5-0.5 1-0.5 1.6 0.2 2.3 0.4 4.6 0.7 6.9 0.3 3.5 0.7 7 1 10.5l0.6 6.9c0.2 2.3 0.5 4.7 0.7 7 0.1 1.8 0.2 3.7 0.3 5.6 0 0.2-0.1 0.4-0.2 0.6-0.9-7-1.5-14.1-2.1-21.3-1.9 0.6-3.6 1-5.5 1-1.7 0-3.5 0.1-5.4 0.2v1.6c0.3 3.4 0.6 6.8 0.9 10.3 0.2 2.2 0.2 4.3 0.6 6.5 0.2 1.6 0.7 3.1 1.3 4.7 0.6 1.8 2.2 2.7 4 3.1 2.8 0.6 5.2-0.3 6.2-2.6 0.4-1 0.7-2.1 0.9-3.1 0.2-0.9 0.1-1.9 0.2-2.8 0-0.4 0.1-0.8 0.4-1.3 0.1 0.4 0.3 0.8 0.3 1.2 0.1 2.1-0.1 4.2-1.1 6.2-1.4 2.9-4 3.7-7 3.1-2.2-0.5-3.6-1.8-4.7-3.9-1.2-2.2-1-4.5-1.2-6.8-0.3-2.5-0.4-5-0.6-7.5s-0.4-5-0.6-7.6c-0.3-3.5-0.6-6.9-0.9-10.4-0.8-2.7-1-5.3-1.2-8zm2 15.3c3.5-2.1 7.1-2.1 11-1.3-0.4-4.8-0.9-9.5-1.3-14-3.7 0.1-7.2 0.2-11 0.3 0.4 5 0.8 9.9 1.3 15zm0.4 1c3.2 0.5 6.2 0.2 9.2-0.6 0.4-0.1 0.7-0.4 1.2-0.6-2.5-1.7-9-0.9-10.4 1.2zm-2-19.3c2.2 1.4 9.6 1 11-0.6-0.5-0.5-1-0.7-1.7-0.5-0.4 0.1-0.9 0.2-1.3 0.1-2.1-0.5-4.1 0.1-6.2 0.3-0.6 0-1.3 0.1-1.8 0.7zm-0.8 0.9c0 0.1-0.1 0.2-0.1 0.4 0.7 0.3 0.8 1.2 1.8 1.2 3.3-0.1 6.7-0.1 9.8-0.2 0.7-0.8 1.2-1.5 1.7-2.2-1.6 0.2-3 0.8-4.4 1.1s-3 0.3-4.4 0.2c-1.5 0-2.9-0.3-4.4-0.5z" />
          <path className="fill-orange" d="m13.1 62.4c0.9 2.3 1.8 4.6 2.7 6.9 0.1 0.3 0.3 0.6 0.5 0.9 1.3 1.9 3.4 2.6 5.6 1.8 1.4-0.5 2.2-1.5 2.3-2.9 0.1-1.1 0-2.2-0.1-3.4 0-0.6-0.2-1.3-0.3-1.9 0.1 0 0.2-0.1 0.3-0.1 0.2 0.4 0.4 0.8 0.5 1.3 0.4 1.4 0.5 2.8 0.3 4.2-0.2 1.5-1 2.6-2.4 3.2-2.3 1.1-4.8 0.5-6.5-1.3-0.9-1-1.4-2.1-1.8-3.3-2.2-6.6-4.5-13.1-6.7-19.7-0.5-1.5-1-3.1-1.5-4.6-0.1-0.6-0.3-1.1-1-1.5-0.9-0.5-0.6-2.3 0.5-2.9 0.7-0.4 1.5-0.8 2.3-1 1.7-0.5 3.3-1 5-1.4 1.3-0.3 1.9 0 2.2 0.9 0.1 0.3 0.1 0.6 0 0.8-0.6 0.8-0.2 1.6 0.1 2.3 1.6 4.6 3.1 9.1 4.7 13.7 1.3 3.7 2.5 7.3 3.8 11 0.2 0.5 0.3 1.1 0.2 1.7-1.4-2.2-1.8-4.8-2.9-7.1-2.4 1.3-4.9 2.1-7.8 2.4zm-6.6-20c2.1 6.2 4.2 12.4 6.4 18.7 2.1-2.4 4.8-2.7 7.5-3.2-2.1-6-4.1-11.9-6.1-17.8-2.7 0.8-5.2 1.5-7.8 2.3zm14 16.5c-2.6-0.3-5.9 1-7 2.7 1.9-0.1 3.5-0.7 5.1-1.4 0.6-0.2 1.5-0.3 1.9-1.3zm-15-19.1c2.5 0.5 6.8-0.9 7.7-2.5-2.7 0.5-5.2 1.1-7.7 2.5zm9-1.9c-1.5 0.7-2.9 1.6-4.3 2.1-1.5 0.5-3.1 0.7-5 1.1 0.6 0.2 0.9 0.4 1.3 0.4 0.5 0 1.1-0.1 1.6-0.3 1.9-0.5 3.8-1.1 5.7-1.6 0.2-0.6 0.5-1.1 0.7-1.7z" />
          <path className="fill-orange" d="m33.1 15c-1.4 0-2.6-1.2-2.5-2.5 0.1-1.6 1.8-3 3.1-2.9 1.2 0.1 2.6 1.4 2.5 2.5-0.1 1.6-1.6 2.9-3.1 2.9zm0.7-4.7c-1.4-0.1-2.5 1.2-2.6 2.2-0.1 0.9 0.8 1.7 1.9 1.7 1.2 0 2.3-1 2.3-2.1 0-1-0.7-1.7-1.6-1.8z" />
          <path className="fill-orange" d="m22.6 1c1.8 0 2.6 0.7 2.6 2.3 0 1.7-1 2.8-2.7 2.8-1.5 0-2.6-1-2.6-2.5 0-1.6 1-2.6 2.7-2.6zm0.3 0.2c-0.4 0.2-0.8 0.3-1.1 0.5-0.9 0.4-1.4 1.4-1.1 2.5 0.2 0.8 1 1.3 2 1.2s1.8-0.8 1.9-1.8c0.1-1.2-0.6-1.9-1.7-2.4z" />
          <path className="fill-orange" d="m2.9 28.6c-1.4 0-2.4-0.7-2.7-1.8-0.3-0.9 0.1-1.9 0.9-2.6 0.1-0.1 0.3-0.3 0.4-0.3 1.1 0 2.4-0.1 3.3 0.7 0.7 0.6 0.7 1.4 0.5 2.1-0.3 0.9-0.9 1.5-1.9 1.8-0.2 0-0.4 0-0.5 0.1zm-0.2-0.7c1.1 0 1.9-0.7 2-1.7 0.1-0.8-0.8-1.7-1.9-1.8s-2.1 0.8-2.2 1.8c0 0.8 1 1.6 2.1 1.7z" />
          <path className="fill-orange" d="m28.9 21.3c-0.9 0-1.5-0.7-1.5-1.7s0.7-1.6 1.8-1.5c1.2 0 1.8 0.5 1.8 1.4 0.1 0.8-1.1 1.8-2.1 1.8zm1.5-2.1c-0.2-0.1-0.4-0.5-0.7-0.6-0.7-0.2-1.5 0.4-1.5 1 0 0.5 0.2 0.9 0.7 1 0.5 0 1.4-0.6 1.5-1.4z" />
          <path className="fill-orange" d="m26.8 9.4c1.3 0.2 1.7 0.8 1.2 1.8-0.4 0.9-1.6 1.4-2.4 1s-1.3-1.4-0.9-2.3c0.3-0.8 0.7-0.9 1.6-0.4-1.1 0.7-1.3 1-0.8 1.6 0.4 0.5 1 0.6 1.5 0.1 0.6-0.5 0.6-0.9-0.2-1.8z" />
          <path className="fill-orange" d="m10 29.4c-0.8 0-1.6-0.7-1.6-1.5 0-0.7 0.7-1.4 1.4-1.4 0.9 0 1.9 0.7 1.9 1.4-0.1 0.8-0.9 1.5-1.7 1.5zm-0.6-2.1c-0.2 1-0.1 1.4 0.4 1.5 0.5 0 0.9-0.4 1-1.3-0.4-0.1-0.9-0.1-1.4-0.2z" />
          <path className="fill-orange" d="m32.4 20.3c0.7-0.4 1.1-0.8 1-1.7 0.7 0.7 1.4 1 2.5 0.8-0.7 0.6-1.6 0.9-1.4 2-0.3-0.3-0.6-0.6-0.8-0.9-0.4 0-0.8 0-1.1 0.1-0.1-0.1-0.2-0.2-0.2-0.3z" />
          <path className="fill-orange" d="m8.1 33.5c0 0.7-0.6 1.3-1.2 1.3-0.5 0-0.9-0.4-0.8-1 0-0.7 0.6-1.3 1.1-1.3 0.5 0.1 0.9 0.5 0.9 1z" />
          <path className="fill-orange" d="m7.1 21.6c-0.7 0-1.1-0.5-1-1.1 0-0.7 0.5-1.1 1.1-1.1 0.7 0 1.1 0.5 1.1 1.1 0 0.7-0.5 1.1-1.2 1.1zm0.4-1.8c-0.3 0.3-0.5 0.6-0.6 0.8 0.1 0.1 0.3 0.3 0.4 0.3 0.3-0.1 0.6-0.3 0.2-1.1z" />
          <path className="fill-orange" d="m30.2 24.7c-0.1 0.7-0.5 1-1.1 1-0.3 0-0.7-0.3-0.8-0.6-0.1-0.4 0.1-0.8 0.3-1.2 0-0.1 0.5-0.1 0.7 0 0.3 0.3 0.6 0.6 0.9 0.8z" />
          <path className="fill-orange" d="m25 14.6c0.2 0.2 0.3 0.4 0.5 0.6 0.2 0.1 0.4 0.2 0.6 0.4-0.3 0.4-0.6 0.8-0.9 1.2-0.4-0.3-0.7-0.6-1-0.9 0.2-0.4 0.5-0.8 0.8-1.3z" />
          <path className="fill-orange" d="m32.4 3.8c-1.3 0.6-2.3 0.5-3.4 0.3 0.7-0.7 1.5-0.7 3.4-0.3z" />
        </svg>
      </figure>
      <figure className="position-absolute top-0 end-0 me-5">
        <svg width="38.4px" height="42.4px">
          <path className="fill-info" d="M23.5,32.8c2.7-1.6,5.1-3.1,7.4-4.5c0.6-0.4,1.2-0.3,1.5,0.3c1.8,4.1,3.7,8.1,4.7,12.5c0,0.1,0,0.1,0,0.2 c-0.6,0.8-1.4,0.7-2.1,0.2c-2.8-1.8-5.5-3.8-8.4-5.4c-4-2.3-6.6-6-9.5-9.4c-2.7-3.2-5.4-6.6-8-9.9c-0.8-1-1.5-1.9-1.7-3.2 C12.7,20,17.9,26.6,23.5,32.8z M30.9,29.3c-2.3,1.3-4.5,2.4-6.4,4.3c2.3,1.5,4.4,2.9,6.5,4.3c0.9-0.9,1.7-1.7,2.6-2.4 C32.7,33.4,31.9,31.5,30.9,29.3z M35,40.5c0-1.6-0.5-2.8-1.2-4.1c-0.7,0.8-1.2,1.4-1.9,2.2C33,39.3,33.9,39.8,35,40.5z" />
          <path className="fill-info" d="M8,13c1.6-2,4.1-3,6-5c-0.4-0.4-0.8-0.8-1.1-1.1C11,8.3,9.3,9.4,7.6,10.7c-0.9,0.7-1.8,1.4-1.4,3.1 c-2.6-2.1-4.8-4-5.1-7.2C0.9,4.7,1.7,3.1,3.3,2c1.6-1.2,3.4-1.4,5.2-0.5c2.1,1.1,3.7,2.9,5.2,4.6c0.5,0.6,0.8,1.4,1.8,1.4 c0.2,0,0.4,0.3,0.5,0.4c4.8,6,9.7,12,13.6,18.6c0.2,0.3,0.3,0.7,0.5,1c-0.1,0.1-0.2,0.1-0.3,0.2c-0.4-0.5-0.9-0.9-1.2-1.4 c-1.9-2.6-3.6-5.4-5.5-7.9c-2.3-3-4.6-5.9-7-8.8c-1-1.2-1.1-1.2-2.4-0.1c-1.5,1.2-3.1,2.4-4.7,3.6c-0.2,0.2-0.5,0.2-0.8,0.3 C8.1,13.2,8,13.1,8,13z M12.1,5.8C10.7,4,9.5,3.1,8.2,2.4C6.5,1.6,4.9,1.7,3.4,3.1C2.2,4.2,1.7,5.6,2.2,7.3c0.5,1.8,1.5,3.2,3.1,4.3 C7.3,9.4,10.2,8.3,12.1,5.8z" />
        </svg>
      </figure>
      <figure className="position-absolute top-50 end-0 translate-middle-y me-5 d-none d-lg-block">
        <svg width="81.3px" height="106.2px">
          <path className="fill-danger" d="M29.9,41.1c-1.7-0.8-2.4-1.5-2.7-2.8c-0.4-1.4-1.7-2.5-2.5-3.7c-4.4-6.7-6.9-14-6.6-22.1 c0.2-4.2,0.9-7.3,2.8-9.6c-0.3,1.9-0.5,3.8-0.9,5.6c-1.5,7.5,0.1,14.6,3.6,21.3c1.5,2.9,3.4,5.6,5.3,8.6 c9.3-4.1,14.3-11.3,16.7-20.6c0.7,2,0.3,3.7-0.3,5.4C42.8,29.9,38.3,35,32,38.6c-0.5,0.3-0.9,0.6-1.4,0.8c0.4,1.5,1.2,2,2.5,1.1 c2.5-1.8,5.1-3.6,7.5-5.5c3.2-2.4,6.5-4.3,10.6-4.8c5.9-0.7,10.7,1.2,15,5c4.7,4.2,7.4,9.7,9.3,15.5c3.2,9.7,3.2,19.6,0.7,29.5 c-0.5,1.8-1.3,3.5-2.1,5.2c-1.6,3.5-5,4.8-8.3,5.8c-1.3,0.4-3-0.1-4.4,0.2c-3.1,0.7-5.6,2.1-6.5,5.5c-0.4,1.7-1.9,2.8-3.4,3.6 c-5.3,2.7-10.9,2.9-16.4,1.1C23.5,98,14,91.3,7,81.1c-6.1-9-6.2-20.8-0.1-29.8c3.6-5.2,8.5-8.4,15-8.8c1.9-0.1,3.7-0.3,5.6-0.6 C28.2,41.9,28.7,41.6,29.9,41.1z M32.5,43.4c-1.5-0.1-2.6-0.3-3.8-0.3c-2.2,0.2-4.3,0.6-6.4,0.7c-5.4,0.4-9.8,2.6-13.1,6.8 c-6.7,8.5-7.3,20.1-1,29.5c5.7,8.6,13.6,14.5,23,18.5c5.4,2.3,10.9,3.6,16.7,1.8c2.8-0.9,5.5-1.9,6.3-5.3c0.5-1.8,1.8-3.1,3.5-3.8 c2.3-0.9,4.6-2,6.9-2.2c2.7-0.3,4.5-1.4,5.8-3.4c1.2-1.8,2.4-3.6,3.2-5.6c2.9-7.4,3.3-15,2-22.8c-1.2-7.1-3.7-13.6-8.4-19.1 c-7.1-8.2-17.4-8.7-24.7-2.8c-2.9,2.3-5.9,4.3-8.9,6.5C33.1,42.4,32.8,43.1,32.5,43.4z" />
          <path className="fill-danger" d="M41.7,2.6c6.6,11.8,1.7,27-10.7,31.8c0.9-0.8,1.8-1.6,2.7-2.4c3.3-2.8,6.3-6,8-10c2.4-5.4,2-11.6-0.4-17 c-0.3,0.1-0.6,0-0.8,0.2c-5.8,4.6-11.1,9.5-13.4,16.9c-0.9,2.9-0.6,5.7,0.8,8.5c0.3,0.6,0.5,1.3,0.9,2.4c-2-0.8-2.5-2.1-2.9-3.4 c-1.3-3.7-0.9-7.3,0.9-10.6c1.2-2.4,2.7-4.7,4.4-6.9C34.1,8.5,37.7,5.5,41.7,2.6z" />
        </svg>
      </figure>
      <Container>
        <Row>
          <Col md={6}>
            <h2>How we care for our students and build their confidence</h2>
          </Col>
          <Col md={6}>
            <p>Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced. </p>
            <Button variant="warning">Contact Us</Button>
          </Col>
        </Row>
        <Row className="g-lg-5 mt-3">
          <Col md={6} lg={4} className="text-center position-relative">
            <figure className="position-absolute top-0 start-100 translate-middle d-none d-lg-block">
              <svg width="182.9px" height="86px" viewBox="0 0 182.9 86">
                <path className="fill-secondary" d="M127.3,19.8c0.9,0.7,1.8,1.5,2.8,2c9.3,4.5,17.1,11.1,24.4,18.3c6.5,6.4,11.9,13.7,15.8,22 c1.5,3.2,2.7,6.6,4.2,10.2c2.5-4.2,4.1-8.9,8.6-11.5c-2.2,3.9-4.7,7.7-6.5,11.9c-1.7,4.1-2.6,8.6-3.9,13.4 c-4.1-6.1-7-13.2-14.9-15.6c3.8-1.4,6.2,0.5,14.1,10.3c1-2.2,1.8-4.1,1.1-6.5c-3.8-13.6-11.4-24.8-21.4-34.6 c-5.8-5.7-12.3-10.6-19.2-14.9c-7-4.3-14.4-8-22.2-10.9c-10.7-3.8-21.5-6.6-32.8-7.7C63.9,5,50.7,5.9,38,10.4 c-14.1,5-26,13.2-35,25.4c-0.5,0.7-1.2,1.4-1.8,2.1C1.1,38,0.8,38,0.4,38.1c-0.9-0.9-0.2-1.7,0.3-2.4c4.7-6.7,10.5-12.4,17.2-17.1 C31.7,8.9,47.2,4.7,63.8,4C77.1,3.5,90,5.8,102.7,9.3c2.2,0.6,4.3,1.8,6.5,2.6c0.9,0.4,2,0.5,2.9,0.7 C117.1,15,122.2,17.4,127.3,19.8z" />
              </svg>
            </figure>
            <div className="px-4">
              <div className="icon-xxl bg-body shadow mx-auto rounded-circle mb-3">
                <img src={childImg} alt="element-image" />
              </div>
              <h5>We care about kids</h5>
              <p className="text-truncate-2 pb-0">Man children rejoiced. Yet uncommonly his ten who diminution astonished.</p>
            </div>
          </Col>
          <Col md={6} lg={4} className="text-center pt-0 pt-lg-5 position-relative">
            <figure className="position-absolute top-100 start-100 translate-middle mt-n3 d-none d-lg-block">
              <svg width="182.9px" height="86px" viewBox="0 0 182.9 86">
                <path className="fill-secondary" d="M127.3,70.2c0.9-0.7,1.8-1.5,2.8-2c9.3-4.5,17.1-11.1,24.4-18.3c6.5-6.4,11.9-13.7,15.8-22 c1.5-3.2,2.7-6.6,4.2-10.2c2.5,4.2,4.1,8.9,8.6,11.5c-2.2-3.9-4.7-7.7-6.5-11.9c-1.7-4.1-2.6-8.6-3.9-13.4 c-4.1,6.1-7,13.2-14.9,15.6c3.8,1.4,6.2-0.5,14.1-10.3c1,2.2,1.8,4.1,1.1,6.5c-3.8,13.6-11.4,24.8-21.4,34.6 c-5.8,5.7-12.3,10.6-19.2,14.9c-7,4.3-14.4,8-22.2,10.9c-10.7,3.8-21.5,6.6-32.8,7.7C63.9,85,50.7,84.1,38,79.6 c-14.1-5-26-13.2-35-25.4c-0.5-0.7-1.2-1.4-1.8-2.1c-0.1-0.1-0.4-0.1-0.8-0.2c-0.9,0.9-0.2,1.7,0.3,2.4c4.7,6.7,10.5,12.4,17.2,17.1 c13.7,9.7,29.2,14,45.9,14.6c13.3,0.5,26.2-1.8,38.8-5.3c2.2-0.6,4.3-1.8,6.5-2.6c0.9-0.4,2-0.5,2.9-0.7 C117.1,74.9,122.2,72.6,127.3,70.2z" />
              </svg>
            </figure>
            <div className="px-4">
              <div className="icon-xxl bg-body shadow mx-auto rounded-circle mb-3">
                <img src={ideaImg} alt="element-image" />
              </div>
              <h5>Building life-long learners</h5>
              <p className="text-truncate-2 pb-0">Who diminution astonished. Yet uncommonly his ten who diminution astonished.</p>
            </div>
          </Col>
          <Col md={6} lg={4} className="text-center">
            <div className="px-4">
              <div className="icon-xxl bg-body shadow mx-auto rounded-circle mb-3">
                <img src={helpImg} alt="element-image" />
              </div>
              <h5>Helping struggling students</h5>
              <p className="text-truncate-2 pb-0">Man children rejoiced. Yet uncommonly his ten who diminution astonished.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default Steps;
