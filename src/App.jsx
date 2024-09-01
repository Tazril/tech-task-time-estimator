import { useState } from 'react';
import { Box, FormControl, MenuItem, Paper, Select, Slider, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./App.css"

const tabs = [
    {
        label: 'Dependencies',
        description: 'Dependencies involving coordination and potential blockers',
        low: 'Few dependencies on other tasks, teams, or systems.',
        medium: 'Some dependencies that might require coordination but are manageable.',
        high: 'Many dependencies requiring significant coordination, potential blockers, or waiting for other teams.',
    },
    {
        label: 'Interactions with Stakeholders',
        description: 'Interactions with Stakeholders requiring multiple meetings, approvals, or clarifications',
        low: 'Stakeholders are available, and communication is straightforward.',
        medium: 'Some back-and-forth with stakeholders for clarifications or approvals.',
        high: 'Frequent or complex interactions with stakeholders, requiring multiple meetings, approvals, or clarifications.',
    },
    {
        label: 'Lack of Skill and Context',
        description: 'Unfamiliarity with codebase and tech-stack',
        low: 'Developer is experienced and familiar with the codebase and task.',
        medium: 'Developer is somewhat familiar but might need to spend time on learning or researching.',
        high: 'Developer is new or unfamiliar with the codebase, requiring significant time for ramp-up.',
    },
    {
        label: 'Environmental Factors',
        description: 'Interruptions like stand-up meetings or on-call issues where context switching required',
        low: 'Developer can work uninterrupted.',
        medium: 'Some interruptions like meetings or team discussions.',
        high: 'Frequent interruptions or significant context switching required.',
    }
]

const App = () => {
    const [workingHours, setWorkingHours] = useState(8);
    const [estimatedTime, setEstimatedTime] = useState(10);
    const [timeUnit, setTimeUnit] = useState('hours');
    const [selectedTabs, setSelectedTabs] = useState([1, 1, 1, 1]);
    const [planningFallacy, setPlanningFallacy] = useState(25);

    const handleTabChange = (index, newValue) => {
        const updatedTabs = [...selectedTabs];
        updatedTabs[index] = newValue;
        setSelectedTabs(updatedTabs);
    };

    const getTabImpactMultiplier = (value) => {
        switch (value) {
            case 0:
                return 1; // Low impact
            case 1:
                return 1.15; // Moderate impact
            case 2:
                return 1.3; // High impact
            default:
                return 1;
        }
    };

    const calculateTotalEstimatedTime = () => {
        const baseTime = timeUnit === 'hours' ? estimatedTime : estimatedTime * workingHours;
        const adjustedTime = baseTime *
            getTabImpactMultiplier(selectedTabs[0]) *
            getTabImpactMultiplier(selectedTabs[1]) *
            getTabImpactMultiplier(selectedTabs[2]) *
            getTabImpactMultiplier(selectedTabs[3]);

        const finalTime = Math.round(adjustedTime + (adjustedTime * (planningFallacy / 100)));

        const days = Math.floor(finalTime / workingHours);
        const remainingHours = finalTime % workingHours;

        const dayLabel = days === 1 ? 'day' : 'days';
        const hourLabel = remainingHours === 1 ? 'hour' : 'hours';

        if (days >= 1) {
            if (remainingHours > 0) {
                return `${finalTime} hours or ${days} ${dayLabel} ${remainingHours} ${hourLabel}`;
            } else {
                return `${finalTime} hours or ${days} ${dayLabel}`;
            }
        } else {
            return `${finalTime} ${hourLabel}`;
        }

    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#2c2c2c',
                padding: '15px'
            }}
        >
            <Paper elevation={3} sx={{ padding: "30px 40px" }}>
                <Typography variant="h5" fontWeight="bolder" gutterBottom>
                    Estimate Time Taken for your Tech Task
                </Typography>

                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Working Hours per Day</Typography>
                    <Typography variant="body2">How many hours you plan to work each day.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Slider
                            value={workingHours}
                            onChange={(e, newValue) => setWorkingHours(newValue)}
                            min={1}
                            max={24}
                        />
                        <Typography variant="body2" fontWeight="bold"
                            sx={{ marginLeft: '15px', whiteSpace: 'nowrap' }}>{workingHours} hours</Typography>
                    </Box>
                </Box>

                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Estimated Time</Typography>
                    <Typography variant="body2">Rough estimate of the total time required based on the
                        complexity.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Slider
                            value={estimatedTime}
                            onChange={(e, newValue) => setEstimatedTime(newValue)}
                            min={1}
                            max={30}
                        />
                        <FormControl sx={{ minWidth: 100, marginLeft: '20px', marginTop: '10px' }}>
                            <Select
                                value={timeUnit}
                                onChange={(e) => setTimeUnit(e.target.value)}
                            >
                                <MenuItem value={'hours'}>Hour</MenuItem>
                                <MenuItem value={'days'}>Day</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body2" fontWeight="bold" sx={{ marginLeft: '10px', whiteSpace: 'nowrap' }}>
                            {estimatedTime} {timeUnit}
                        </Typography>
                    </Box>
                </Box>


                {tabs.map(({ label, description, low, medium, high }, index) => (
                    <Box key={index} sx={{ marginBottom: '20px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{label}</Typography>
                        <Typography variant="body2">{description}.</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Tabs
                                value={selectedTabs[index]}
                                onChange={(e, newValue) => handleTabChange(index, newValue)}
                                aria-label={`${label} tabs`}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab
                                    label={
                                        <Tooltip title={low}>Low</Tooltip>
                                    }
                                    icon={<LowPriorityIcon />}
                                    iconPosition="top"

                                />
                                <Tab
                                    label={
                                        <Tooltip title={medium}>Medium</Tooltip>
                                    }
                                    icon={<RemoveRedEyeIcon />}
                                    iconPosition="top"
                                />
                                <Tab
                                    label={
                                        <Tooltip title={high}>High</Tooltip>
                                    }
                                    icon={<ReportProblemIcon />}
                                    iconPosition="top"
                                />
                            </Tabs>
                            <Typography variant="body2" fontWeight="bold" sx={{ marginLeft: '10px', whiteSpace: 'nowrap' }}>
                                x {Math.round(getTabImpactMultiplier(selectedTabs[index]) * 100) - 100}%
                            </Typography>
                        </Box>
                    </Box>
                ))}

                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Planning Fallacy (Optional)</Typography>
                    <Typography variant="body2">Cognitive bias that causes people to underestimate the time associated
                        with a project</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Slider
                            value={planningFallacy}
                            onChange={(e, newValue) => setPlanningFallacy(newValue)}
                            min={0}
                            max={100}
                            step={5}
                        />
                        <Typography variant="body2" fontWeight="bold" sx={{ marginLeft: '10px', whiteSpace: 'nowrap' }}>
                            x {planningFallacy}%
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h6">Estimated Time: {calculateTotalEstimatedTime()}</Typography>
                <br />
                <Typography variant="caption" minWidth={100}>Made with ❤️ by Tazril Ali</Typography>
            </Paper>
        </Box>
    );
};


export default App;
