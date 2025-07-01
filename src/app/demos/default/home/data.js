import { FaTv, FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { MdAssignment, MdAssignmentTurnedIn } from 'react-icons/md';
import { BiSolidVideos } from "react-icons/bi";
import { BsPatchCheckFill } from 'react-icons/bs';
export const counterData = [{
  title: 'SOPs',
  count: 16,
  suffix: '',
  icon: FaTv,
  variant: 'warning'
}, {
  title: 'Education Video',
  count: 12,
  suffix: '+',
  icon: BiSolidVideos,
  variant: 'blue'
}, {
  title: 'Assignment',
  count: 5,
  suffix: '',
  icon: MdAssignment,
  variant: 'purple'
}, {
  title: 'Evaluation',
  count: 10,
  suffix: '',
  icon: MdAssignmentTurnedIn,
  variant: 'info'
}];
