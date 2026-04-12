import React, { useState } from 'react';
import { BrainCircuit, CheckCircle2, RefreshCw, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { questions, analyzeResponses } from '../../services/psychometricService';

const PsychometricTest = () => {
  const { user, setInterests, isLoading } = useAppStore();
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setIsStarted(true);
    setAnswers([]);
    setCurrentStep(0);
    setResult(null);
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const detectedInterests = analyzeResponses(answers);
    setResult(detectedInterests);
  };

  const handleApply = async () => {
    if (result) {
      await setInterests(result);
      setIsStarted(false);
      setResult(null);
    }
  };

  if (!isStarted) {
    return (
      <Card className="bg-primary/5 border-primary/20 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <BrainCircuit size={120} className="text-primary transform rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h3 className="font-headline text-xl mb-1">
                {user.interests && user.interests.length > 0 ? "Refine Your Trajectory" : "Discover Your Primary Interest"}
              </h3>
              <p className="font-body text-sm text-on-surface-variant max-w-md">
                Take a 2-minute psychometric test to automatically personalize your learning paths and mentor insights.
              </p>
            </div>
          </div>
          <Button onClick={handleStart} className="flex gap-2 min-w-[160px]">
            {user.interests && user.interests.length > 0 ? "Retake Test" : "Start Now"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </Card>
    );
  }

  if (result) {
    return (
      <Card className="bg-surface border-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-headline text-2xl mb-2">Analysis Complete</h3>
          <p className="font-body text-on-surface-variant mb-8">
            Based on your cognitive patterns, your strongest potential lies in:
          </p>
          
          <div className="flex justify-center gap-4 mb-10">
            {result.map((interest, idx) => (
              <div key={idx} className="bg-primary/10 border border-primary/30 px-6 py-3 rounded-2xl flex items-center gap-3">
                <Zap size={18} className="text-primary" />
                <span className="font-headline text-lg text-primary">{interest}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={handleStart} className="flex gap-2">
              <RefreshCw size={16} />
              Retake Test
            </Button>
            <Button onClick={handleApply} disabled={isLoading} className="flex gap-2 min-w-[200px]">
              {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              Apply to My Profile
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <Card className="bg-surface border-outline-variant relative animate-in fade-in duration-300">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="font-body text-xs text-on-surface-variant">
            Precision: {Math.round(progress)}%
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        <h3 className="font-headline text-2xl mb-8 leading-tight">
          {currentQuestion.text}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md
                ${answers[currentStep] === option.value 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-outline-variant hover:border-primary/40 bg-surface'}`}
            >
              <p className={`font-body text-md ${answers[currentStep] === option.value ? 'text-primary font-semibold' : 'text-on-surface'}`}>
                {option.text}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-12 pt-6 border-t border-outline-variant/30">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          disabled={currentStep === 0}
          className="flex gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        {currentStep === questions.length - 1 ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!answers[currentStep]}
            className="flex gap-2 min-w-[140px]"
          >
            Finish Analysis
            <CheckCircle2 size={16} />
          </Button>
        ) : (
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)} 
            disabled={!answers[currentStep]}
            className="flex gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PsychometricTest;
