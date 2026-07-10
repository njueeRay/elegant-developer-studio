import { ArrowRight, Gauge, GitBranch, LibraryBig, Search } from "lucide-react";
import Link from "next/link";
import type { ContentScaleStatus } from "@/lib/content-scale";

type ContentScalePanelProps = {
  status: ContentScaleStatus;
};

export function ContentScalePanel({ status }: ContentScalePanelProps) {
  return (
    <section className="content-scale-panel" aria-label="Content scale and evidence navigation">
      <div className="content-scale-head">
        <div>
          <span>content.scale(&quot;watch&quot;)</span>
          <h2>Scale is now an editorial decision.</h2>
        </div>
        <p>
          The archive is still small enough for visible filters, but the next
          essay crosses the posts &gt; {status.postReviewTrigger} review line.
          Add evidence paths before adding volume.
        </p>
      </div>

      <div className="content-scale-metrics" aria-label="Content scale metrics">
        <Metric icon={LibraryBig} label="Posts" value={`${status.posts}`} detail="published essays" />
        <Metric icon={GitBranch} label="Knowledge" value={`${status.knowledge}`} detail="reference entries" />
        <Metric icon={Search} label="Command index" value={`${status.commandItems}`} detail="lazy-loaded items" />
        <Metric
          icon={Gauge}
          label="Next gate"
          value={status.nextPostTriggersReview ? "1 essay" : "open"}
          detail={status.nextPostTriggersReview ? "triggers review" : "before scale review"}
        />
      </div>

      <div className="content-scale-links" aria-label="Evidence navigation shortcuts">
        <ScaleLink href="/blog?tag=External+proof" label="External proof essays" />
        <ScaleLink href="/knowledge/personal-site-object-grammar" label="Object grammar rule" />
        <ScaleLink href="/knowledge/project-evidence-minimum-standard" label="Evidence standard" />
        <ScaleLink href="/command-index.json" label="Command payload" />
      </div>
      {status.postAdmissionGateArmed ? (
        <p className="content-scale-gate">
          <strong>{status.postAdmissionGateName} is armed.</strong> The next essay needs an external
          object, project evidence, or a durable Knowledge rule before release.
        </p>
      ) : null}
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof LibraryBig;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="content-scale-metric">
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function ScaleLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="content-scale-link">
      <span>{label}</span>
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
