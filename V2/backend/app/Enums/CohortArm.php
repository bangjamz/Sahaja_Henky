<?php

namespace App\Enums;

/** Lengan kohort (cohorts.arm). */
enum CohortArm: string
{
    case Experiment = 'experiment';
    case Control = 'control';
    case Pilot = 'pilot';
    case Survey = 'survey';
    case Demo = 'demo';
}
