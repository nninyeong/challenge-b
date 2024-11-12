import { FOLDED_HEIGHT } from '@/utils/createCardFormHeightMapper';
import { motion } from 'framer-motion';

interface FormMotionContainerProps {
  height: string;
  children: React.ReactNode;
  className?: string;
}

const FormMotionContainer = ({ height, children, className }: FormMotionContainerProps) => {
  return (
    <motion.div
      initial={{ height: FOLDED_HEIGHT }}
      animate={{ height: height }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FormMotionContainer;
