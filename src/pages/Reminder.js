import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


const Reminder = () => {
  return (
    <div className='grid   md:pt-[56px] md:px-[151px]'>
        <div className='w-fit grid justify-start'>
            <h2 className='w-fit font-semibold text-[40px]'>Change user preferences below</h2>
            <p className='w-fit'>Update reminder preferences</p>
        </div>
        
        <div>
        <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot className='w-6' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent >connnect social network</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>schedule Notification</TimelineContent>
      </TimelineItem>
      
    </Timeline>
        </div>
        <div></div>
</div>
  )
}

export default Reminder