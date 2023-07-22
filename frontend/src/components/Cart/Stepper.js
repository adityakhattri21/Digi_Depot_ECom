import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react"

const steps = [
    { title: 'Shipping', description: 'Shipping Info' },
    { title: 'Your Order', description: 'Confirm Order' },
    { title: 'Payment', description: 'Final Payment' },
  ]
  
  function Steper({step}) {
    const {activeStep}  = useSteps({
      index: step,
      count: steps.length,
    })
  
    return (
      <Stepper size='md' colorScheme='red' index={activeStep} width={'lg'} margin={'auto'} marginTop={'10'} display={['none','flex']}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }

export default Steper;
  