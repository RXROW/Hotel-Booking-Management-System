// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// interface ViewModalProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   data: Record<string, string>;
// }

// const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, title, data }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" BackdropProps={{ invisible: true }}>
//       <DialogTitle>
       
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">
//           {title}
//           </Typography>
//           <IconButton
//             onClick={onClose}
//             color="error"
//             sx={{
//               border: "3px solid",
//               width: 30,
//               height: 30,
//             }}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers sx={{ px: 4, py: 4 }}>
//         {Object.entries(data).map(([label, value]) => (
//           <Box key={label} mb={2}>
//             <Typography variant="subtitle2" fontWeight="bold">
//               {label}
//             </Typography>
//             <Typography variant="body1">{value || ''}</Typography>
//           </Box>
//         ))}
//       </DialogContent>
      
//     </Dialog>
//   );
// };

// export default ViewModal;

/**//////////////////////////// */

// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   Box,
//   IconButton,
//   Avatar,
//   Grid,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// interface ViewModalProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   data: Record<string, string>;
// }

// const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, title, data }) => {
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       BackdropProps={{ invisible: true }}
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">{title}</Typography>
//           <IconButton
//             onClick={onClose}
//             color="error"
//             sx={{
//               border: "3px solid",
//               width: 30,
//               height: 30,
//             }}
//           >
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         </Box>
//       </DialogTitle>

//       <DialogContent dividers sx={{ px: 4, py: 4 }}>
//         {/* عرض الصورة لو موجودة */}
//         {data?.Image && (
//           <Box display="flex" justifyContent="center" mb={4}>
//             <Avatar
//               src={data.Image}
//               alt="User"
//               sx={{ width: 120, height: 120 }}
//             />
//           </Box>
//         )}

//         {/* عرض باقي البيانات */}
//         <Grid container spacing={3}>
//           {Object.entries(data).map(([label, value]) => {
//             if (label === 'Image') return null; // تجاهل عرض الصورة ضمن البيانات النصية
//             return (
//               <Grid item xs={6} key={label}>
//                 <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
//                   {label}
//                 </Typography>
//                 <Typography variant="body1">{value || 'N/A'}</Typography>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ViewModal;


/**//////////////////////////// */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Avatar,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, string>;
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, title, data }) => {
  const isRoom = title.toLowerCase().includes('room'); 

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      BackdropProps={{ invisible: true }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton
            onClick={onClose}
            color="error"
            sx={{
              border: "3px solid",
              width: 30,
              height: 30,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 4 }}>
        {/* عرض الصورة لو موجودة */}
        {data?.Image && (
          <Box display="flex" justifyContent="center" mb={4}>
            <Avatar
              src={data.Image}
              alt="Image"
              variant={isRoom ? 'square' : 'circular'} // مربعة إذا Room، دائرية غير ذلك
              sx={{
                width: isRoom ? 160 : 120,
                height: isRoom ? 160 : 120,
                borderRadius: isRoom ? 2 : '50%', // زيادة التدوير لو مش غرفة
              }}
            />
          </Box>
        )}

        {/* عرض باقي البيانات */}
        <Grid container spacing={3}>
          {Object.entries(data).map(([label, value]) => {
            if (label === 'Image') return null; // تجاهل عرض الصورة ضمن الحقول
            return (
              <Grid item xs={6} key={label}>
                <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
                  {label}
                </Typography>
                <Typography variant="body1">{value || 'N/A'}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
