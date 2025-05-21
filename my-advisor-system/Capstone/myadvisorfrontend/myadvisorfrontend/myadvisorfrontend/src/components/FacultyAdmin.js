import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, IconButton, List, ListItem, ListItemText, Divider, Tabs, Tab } from '@mui/material';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));


const ContainerBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #63b3ed, #fbb6ce)', // from-blue-400 to-pink-300
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const FacultyAdmin = () => {
  const [value, setValue] = useState(0);
  const [degrees, setDegrees] = useState([
    { name: 'Bachelor of Science - (BSc)', majors: ['Computer Science', 'Chemistry','Mathematics'] },
    { name: 'Bachelor of Arts - (BA)', majors: ['Theatre and Performance', 'History','English'] },
    { name: 'BEng - ', majors:['Chemical Engineering','Civil Engineering']},
    {name: 'BCom -',majors:[]}
  ]);
  const [newDegree, setNewDegree] = useState('');
  const [newMajor, setNewMajor] = useState('');
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [editingMajorIndex, setEditingMajorIndex] = useState(null);
  const [editingDegreeIndex, setEditingDegreeIndex] = useState(null);

  const [courseLimits, setCourseLimits] = useState(['Science degree (SB001), shall not be permitted to reregister in the Faculty unless the student has completed at least',
    '1st year (2 full year Science courses)',
    '2nd year (4 full year courses including all the first year courses',
    '3rd year (6 full year courses)',
    '4th year (students are expected to complete all the requirements of the degree. )']);

  const [newCourseLimit, setNewCourseLimit] = useState('');
  const [editingCourseLimitIndex, setEditingCourseLimitIndex] = useState(null);

  const [prerequisiteFreeCourses, setPrerequisiteFreeCourses] = useState(['FTX1005S','CSC1015S']);
  const [newPrerequisiteFreeCourse, setNewPrerequisiteFreeCourse] = useState('');
  const [editingPrerequisiteFreeCourseIndex, setEditingPrerequisiteFreeCourseIndex] = useState(null);

  const [specialCourses, setSpecialCourses] = useState(['FTX2000S']);
  const [newSpecialCourse, setNewSpecialCourse] = useState('');
  const [editingSpecialCourseIndex, setEditingSpecialCourseIndex] = useState(null);

  // Handles tab switching
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddDegree = () => {
    if (newDegree.trim()) {
      setDegrees([...degrees, { name: newDegree, majors: [] }]);
      setNewDegree('');
    }
  };

  const handleAddMajor = () => {
    if (newMajor.trim() && selectedDegree !== null) {
      const updatedDegrees = degrees.map((degree, index) =>
        index === selectedDegree
          ? { ...degree, majors: [...degree.majors, newMajor] }
          : degree
      );
      setDegrees(updatedDegrees);
      setNewMajor('');
    }
  };

  const handleEditDegree = (index, newName) => {
    if (newName.trim()) {
      const updatedDegrees = degrees.map((degree, i) =>
        i === index ? { ...degree, name: newName } : degree
      );
      setDegrees(updatedDegrees);
      setEditingDegreeIndex(null);
    }
  };

  const handleEditMajor = (degreeIndex, majorIndex, newMajor) => {
    if (newMajor.trim()) {
      const updatedDegrees = degrees.map((degree, index) =>
        index === degreeIndex
          ? { ...degree, majors: degree.majors.map((major, i) => (i === majorIndex ? newMajor : major)) }
          : degree
      );
      setDegrees(updatedDegrees);
      setEditingMajorIndex(null);
    }
  };

  const handleDeleteDegree = (index) => {
    setDegrees(degrees.filter((_, i) => i !== index));
  };

  const handleDeleteMajor = (degreeIndex, majorIndex) => {
    const updatedDegrees = degrees.map((degree, index) =>
      index === degreeIndex
        ? { ...degree, majors: degree.majors.filter((_, i) => i !== majorIndex) }
        : degree
    );
    setDegrees(updatedDegrees);
  };

  
  const handleAddCourseLimit = () => {
    if (newCourseLimit.trim()) {
      setCourseLimits([...courseLimits, newCourseLimit]);
      setNewCourseLimit('');
    }
  };

  const handleEditCourseLimit = (index, newLimit) => {
    if (newLimit.trim()) {
      const updatedLimits = courseLimits.map((limit, i) => (i === index ? newLimit : limit));
      setCourseLimits(updatedLimits);
      setEditingCourseLimitIndex(null);
    }
  };

  const handleDeleteCourseLimit = (index) => {
    setCourseLimits(courseLimits.filter((_, i) => i !== index));
  };

  
  const handleAddPrerequisiteFreeCourse = () => {
    if (newPrerequisiteFreeCourse.trim()) {
      setPrerequisiteFreeCourses([...prerequisiteFreeCourses, newPrerequisiteFreeCourse]);
      setNewPrerequisiteFreeCourse('');
    }
  };

  const handleEditPrerequisiteFreeCourse = (index, newCourse) => {
    if (newCourse.trim()) {
      const updatedCourses = prerequisiteFreeCourses.map((course, i) => (i === index ? newCourse : course));
      setPrerequisiteFreeCourses(updatedCourses);
      setEditingPrerequisiteFreeCourseIndex(null);
    }
  };

  const handleDeletePrerequisiteFreeCourse = (index) => {
    setPrerequisiteFreeCourses(prerequisiteFreeCourses.filter((_, i) => i !== index));
  };

  
  const handleAddSpecialCourse = () => {
    if (newSpecialCourse.trim()) {
      setSpecialCourses([...specialCourses, newSpecialCourse]);
      setNewSpecialCourse('');
    }
  };

  const handleEditSpecialCourse = (index, newCourse) => {
    if (newCourse.trim()) {
      const updatedCourses = specialCourses.map((course, i) => (i === index ? newCourse : course));
      setSpecialCourses(updatedCourses);
      setEditingSpecialCourseIndex(null);
    }
  };

  const handleDeleteSpecialCourse = (index) => {
    setSpecialCourses(specialCourses.filter((_, i) => i !== index));
  };

  return (
    <ContainerBox>
      <Typography variant="h4" align="center" gutterBottom>
        Faculty Rules
      </Typography>

      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" centered>
        <Tab label="Majors and Courses" />
        <Tab label="Faculty Rules and Registration" />
        <Tab label="Courses with no prerequisites" />
        <Tab label="Second semester courses with no first semester prerequ" />
      </Tabs>

      {/* Tab Panels */}
      {/* Majors and Courses */}
      <Box role="tabpanel" hidden={value !== 0}>
        <Card variant="outlined" sx={{ marginTop: 2, padding: 3 }}>
          <Typography variant="h5">Majors and Courses</Typography>

          {/* Add New Degree */}
          <Box mt={3}>
            <TextField
              label="Add Degree"
              variant="outlined"
              value={newDegree}
              onChange={(e) => setNewDegree(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddDegree}>
              Add Degree
            </Button>
          </Box>

          {/* List of Degrees */}
          <List>
            {degrees.map((degree, degreeIndex) => (
              <Box key={degreeIndex}>
                <ListItem>
                  
                  {editingDegreeIndex === degreeIndex ? (
                    <TextField
                      value={degree.name}
                      onChange={(e) => handleEditDegree(degreeIndex, e.target.value)}
                    />
                  ) : (
                    <ListItemText primary={degree.name} />
                  )}
                  {editingDegreeIndex === degreeIndex ? (
                    <StyledIconButton onClick={() => handleEditDegree(degreeIndex, degree.name)}>
                      <Save />
                    </StyledIconButton>
                  ) : (
                    <StyledIconButton onClick={() => setEditingDegreeIndex(degreeIndex)}>
                      <Edit />
                    </StyledIconButton>
                  )}
                  <StyledIconButton onClick={() => handleDeleteDegree(degreeIndex)}>
                    <Delete />
                  </StyledIconButton>
                </ListItem>
                <Divider />

                {/* Add Major to Degree */}
                {selectedDegree === degreeIndex && (
                  <Box ml={4} mt={2} mb={2}>
                    <TextField
                      label={`Add Major to ${degree.name}`}
                      variant="outlined"
                      value={newMajor}
                      onChange={(e) => setNewMajor(e.target.value)}
                      sx={{ marginRight: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddMajor}>
                      Add Major
                    </Button>
                  </Box>
                )}

                {/* Lists Majors */}
                <List component="div" disablePadding>
                  {degree.majors.map((major, majorIndex) => (
                    <ListItem key={majorIndex} disableGutters>
                      {editingMajorIndex === majorIndex && selectedDegree === degreeIndex ? (
                        <TextField
                          value={major}
                          onChange={(e) => handleEditMajor(degreeIndex, majorIndex, e.target.value)}
                        />
                      ) : (
                        <ListItemText primary={major} />
                      )}
                      {editingMajorIndex === majorIndex && selectedDegree === degreeIndex ? (
                        <StyledIconButton onClick={() => handleEditMajor(degreeIndex, majorIndex, major)}>
                          <Save />
                        </StyledIconButton>
                      ) : (
                        <StyledIconButton onClick={() => setEditingMajorIndex(majorIndex)}>
                          <Edit />
                        </StyledIconButton>
                      )}
                      <StyledIconButton onClick={() => handleDeleteMajor(degreeIndex, majorIndex)}>
                        <Delete />
                      </StyledIconButton>
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant="contained"
                  color={selectedDegree === degreeIndex ? 'secondary' : 'primary'}
                  onClick={() => setSelectedDegree(selectedDegree === degreeIndex ? null : degreeIndex)}
                  startIcon={<Add />}
                  sx={{ marginTop: 2 }}
                >
                  {selectedDegree === degreeIndex ? 'Close Majors' : 'Add Majors'}
                </Button>
              </Box>
            ))}
          </List>
        </Card>
      </Box>

      {/* Faculty Rules and Registration */}
      <Box role="tabpanel" hidden={value !== 1}>
        <Card variant="outlined" sx={{ marginTop: 2, padding: 3 }}>
          <Typography variant="h5">Faculty Rules and Registration</Typography>

          <Box mt={3}>
            <TextField
              label="Add Faculty Rule"
              variant="outlined"
              value={newCourseLimit}
              onChange={(e) => setNewCourseLimit(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddCourseLimit}>
              Add Rule
            </Button>
          </Box>

          {/* List of Course Limits */}
          <List>
            {courseLimits.map((limit, index) => (
              <ListItem key={index}>
                {editingCourseLimitIndex === index ? (
                  <TextField
                    value={limit}
                    onChange={(e) => handleEditCourseLimit(index, e.target.value)}
                  />
                ) : (
                  <ListItemText primary={limit} />
                )}
                {editingCourseLimitIndex === index ? (
                  <StyledIconButton onClick={() => handleEditCourseLimit(index, limit)}>
                    <Save />
                  </StyledIconButton>
                ) : (
                  <StyledIconButton onClick={() => setEditingCourseLimitIndex(index)}>
                    <Edit />
                  </StyledIconButton>
                )}
                <StyledIconButton onClick={() => handleDeleteCourseLimit(index)}>
                  <Delete />
                </StyledIconButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>

      {/* Prerequisite-Free Courses */}
      <Box role="tabpanel" hidden={value !== 2}>
        <Card variant="outlined" sx={{ marginTop: 2, padding: 3 }}>
          <Typography variant="h5">Courses with no prerequisites</Typography>

          <Box mt={3}>
            <TextField
              label="Enter course"
              variant="outlined"
              value={newPrerequisiteFreeCourse}
              onChange={(e) => setNewPrerequisiteFreeCourse(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddPrerequisiteFreeCourse}>
              Add Course
            </Button>
          </Box>

          {/* List of Prerequisite-Free Courses */}
          <List>
            {prerequisiteFreeCourses.map((course, index) => (
              <ListItem key={index}>
                {editingPrerequisiteFreeCourseIndex === index ? (
                  <TextField
                    value={course}
                    onChange={(e) => handleEditPrerequisiteFreeCourse(index, e.target.value)}
                  />
                ) : (
                  <ListItemText primary={course} />
                )}
                {editingPrerequisiteFreeCourseIndex === index ? (
                  <StyledIconButton onClick={() => handleEditPrerequisiteFreeCourse(index, course)}>
                    <Save />
                  </StyledIconButton>
                ) : (
                  <StyledIconButton onClick={() => setEditingPrerequisiteFreeCourseIndex(index)}>
                    <Edit />
                  </StyledIconButton>
                )}
                <StyledIconButton onClick={() => handleDeletePrerequisiteFreeCourse(index)}>
                  <Delete />
                </StyledIconButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>

      {/* Special Courses */}
      <Box role="tabpanel" hidden={value !== 3}>
        <Card variant="outlined" sx={{ marginTop: 2, padding: 3 }}>
          <Typography variant="h5">Second semester courses with no first semester prerequisites </Typography>

          <Box mt={3}>
            <TextField
              label="Add Special Course"
              variant="outlined"
              value={newSpecialCourse}
              onChange={(e) => setNewSpecialCourse(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddSpecialCourse}>
              Add Course
            </Button>
          </Box>

          {/* List of Special Courses */}
          <List>
            {specialCourses.map((course, index) => (
              <ListItem key={index}>
                {editingSpecialCourseIndex === index ? (
                  <TextField
                    value={course}
                    onChange={(e) => handleEditSpecialCourse(index, e.target.value)}
                  />
                ) : (
                  <ListItemText primary={course} />
                )}
                {editingSpecialCourseIndex === index ? (
                  <StyledIconButton onClick={() => handleEditSpecialCourse(index, course)}>
                    <Save />
                  </StyledIconButton>
                ) : (
                  <StyledIconButton onClick={() => setEditingSpecialCourseIndex(index)}>
                    <Edit />
                  </StyledIconButton>
                )}
                <StyledIconButton onClick={() => handleDeleteSpecialCourse(index)}>
                  <Delete />
                </StyledIconButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </ContainerBox>
  );
};

export default FacultyAdmin;